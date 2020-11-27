package software.bytepushers.pick3.deploy;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.AmazonWebServiceResult;
import com.amazonaws.SdkClientException;
import com.amazonaws.client.builder.AwsSyncClientBuilder;
import com.amazonaws.services.cloudformation.AmazonCloudFormation;
import com.amazonaws.services.cloudformation.AmazonCloudFormationClient;
import com.amazonaws.services.cloudformation.AmazonCloudFormationClientBuilder;
import com.amazonaws.services.cloudformation.model.*;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClient;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.model.GetFunctionRequest;
import com.amazonaws.services.lambda.model.GetFunctionResult;
import com.amazonaws.services.lambda.model.UpdateFunctionCodeRequest;
import com.amazonaws.services.lambda.model.UpdateFunctionCodeResult;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.BucketVersioningConfiguration;
import com.amazonaws.services.s3.model.HeadBucketRequest;
import com.amazonaws.services.s3.model.SetBucketVersioningConfigurationRequest;
import org.apache.commons.lang3.StringUtils;
import org.joda.time.DateTime;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

/**
 * Class with main method meant to be run by Maven exec during deploy phase.</br>
 * </br>
 * This class expects that AWS credentials are configured as expected by
 * {@link com.amazonaws.auth.DefaultAWSCredentialsProviderChain}.
 */
public class DeployToAwsLambda {
    private static final String PROP_AWS_REGION = "bytepushers.deploy.awsRegion";
    private static final String PROP_BUCKET_NAME = "bytepushers.deploy.chuckspick3.ws.s3BucketName";
    private static final String PROP_OBJECT_NAME = "bytepushers.deploy.s3ObjectName";
    private static final String PROP_PAYLOAD_LOCAL_PATH = "bytepushers.deploy.payloadLocalPath";
    private static final String PROP_LAMBDA_FUNCTION_NAME = "bytepushers.deploy.lambdaFunctionName";
    private static final String PROP_CLOUDFORMATION_TEMPLATE = "bytepushers.deploy.cloudFormationTemplate";
    private static final String PROP_CLOUDFORMATION_STACK_NAME = "bytepushers.deploy.cloudFormationStackName";

    public static void main(String[] args) {
        final AmazonS3 s3Client = buildS3Client();

        final String bucketName = System.getenv().get(PROP_BUCKET_NAME);
        if (StringUtils.isBlank(bucketName)) {
            String errorMessage = String.format("Bucket name not found in Environment Variable: '%s'", PROP_BUCKET_NAME);
            throw new IllegalArgumentException(errorMessage);
        }


        String objectName = System.getProperty(PROP_OBJECT_NAME);

        if (!s3BucketExists(s3Client, bucketName)) {
            createS3Bucket(s3Client, bucketName);
        }

        final String fileName = System.getProperty(PROP_PAYLOAD_LOCAL_PATH);
        File file = new File(fileName);
        System.out.println("Payload is at " + fileName);

        // Add a timestamp to the object name if the bucket is not configured to use versioning.
        final String timestamp = DateTime.now().toString("y.M.d.H.m.s.S");

        if (s3BucketHasVersioningEnabled(s3Client, bucketName)) {
            objectName = objectName + ':' + timestamp;
        }

        sendPayloadToS3(s3Client, bucketName, objectName, file);

        final AWSLambda lambdaClient = buildLambdaClient();
        final AmazonCloudFormation cloudFormationClient = buildCloudFormationClient();
        final String functionName = System.getProperty(PROP_LAMBDA_FUNCTION_NAME);
        final String stackName = System.getProperty(PROP_CLOUDFORMATION_STACK_NAME);

        if (!cloudFormationStackExists(cloudFormationClient, stackName)) {
            // Create a new cloud formation stack using the specified SAM template.
            createCloudFormationStack(cloudFormationClient, bucketName, objectName);
            System.out.println("Created a new cloud formation stack using the specified SAM template.");
        } else {
            // Attempt to update the existing lambda function.
            updateAndPublishLambdaFunction(lambdaClient, functionName, bucketName, objectName, fileName);
            System.out.println("Updated the existing lambda function (" + functionName + ").");
        }
    }

    private static void createS3Bucket(AmazonS3 client, String bucketName) {
        client.createBucket(bucketName);
        client.setBucketVersioningConfiguration(new SetBucketVersioningConfigurationRequest(bucketName,
                new BucketVersioningConfiguration().withStatus("ENABLED")));

        System.out.println("!!!IMPORTANT!!! Created new S3 Bucket " + bucketName + ". Configure bucket management via console");
    }

    private static void createCloudFormationStack(AmazonCloudFormation cloudFormationClient, String bucketName,
                                                  String objectName) {
        final String stackName = System.getProperty(PROP_CLOUDFORMATION_STACK_NAME);
        final String templateFile = System.getProperty(PROP_CLOUDFORMATION_TEMPLATE);
        final String functionName = System.getProperty(PROP_LAMBDA_FUNCTION_NAME);

        final String templateBody =
                readCloudFormationTemplateAndSubstituteProperties(templateFile, bucketName, objectName, functionName);

        // Note: We cannot create a new stack using SAM templates, since templates containing transform directives
        // must be introduced via change sets.
        final String changeSetName = "createFromInitialSamTransform";

        CreateChangeSetResult changeSetResult = cloudFormationClient.createChangeSet(new CreateChangeSetRequest()
                .withStackName(stackName)
                .withChangeSetName(changeSetName)
                .withChangeSetType(ChangeSetType.CREATE)
                .withTemplateBody(templateBody)
                .withCapabilities(Capability.CAPABILITY_IAM, Capability.CAPABILITY_NAMED_IAM));

        ChangeSetStatus status = monitorChangeSetCreationStatus(cloudFormationClient, stackName, changeSetName);
        if (status != ChangeSetStatus.CREATE_COMPLETE) {
            throw new RuntimeException("ChangeSet creation failed for stack " + stackName + ". Last status was: " + status);
        }

        checkForErrors(changeSetResult, "create new change set");

        ExecuteChangeSetResult executeChangeSetResult = cloudFormationClient.executeChangeSet(new ExecuteChangeSetRequest()
                .withStackName(stackName)
                .withChangeSetName(changeSetName));

        try {
            ExecutionStatus execStatus = monitorChangeSetExecutionStatus(cloudFormationClient, stackName, changeSetName);
            if (execStatus != ExecutionStatus.EXECUTE_COMPLETE) {
                throw new RuntimeException("ChangeSet execution failed for stack " + stackName + ". Last status was: " + execStatus);
            }
        } catch (ChangeSetNotFoundException e) {
            // This could be good. It could mean that our change set completed! But only if the stack exists...
            DescribeStacksResult result = cloudFormationClient.describeStacks(new DescribeStacksRequest().withStackName(stackName));
        }

        StackStatus stackStatus = monitorStackCreationStatus(cloudFormationClient, stackName);
        if (stackStatus != StackStatus.CREATE_COMPLETE) {
            throw new RuntimeException("Attempt to create stack failed for stack " + stackName);
        }

        checkForErrors(executeChangeSetResult, "execute change set");

        System.out.println("Created new CloudFormation stack with ID: " + changeSetResult.getStackId());

        Stack stack =
                cloudFormationClient.describeStacks(new DescribeStacksRequest().withStackName(stackName)).getStacks().get(0);

        System.out.println("\nStack outputs:");
        for (Output output : stack.getOutputs()) {
            System.out.println("  " + output.getOutputKey() + ":   " + output.getOutputValue());
        }
        System.out.println();
    }


    private static StackStatus monitorStackCreationStatus(AmazonCloudFormation client, String stackName) {
        try {
            StackStatus status, lastStatus = null;
            do {
                DescribeStacksResult describeStacksResult = client.describeStacks(new DescribeStacksRequest()
                        .withStackName(stackName));
                status = StackStatus.valueOf(describeStacksResult.getStacks().get(0).getStackStatus());

                if (status != lastStatus) {
                    System.out.print("\nCreation of stack for " + stackName + " is " + status + "  ");
                    lastStatus = status;
                } else {
                    System.out.print('.');
                }
                switch (status) {
                    case CREATE_COMPLETE:
                    case CREATE_FAILED:
                        return status;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Interrupt caught while monitoring stack creation. Ending process.");
                    System.exit(0); // Only interrupted if the monitoring process was killed.
                }
            } while (status == StackStatus.CREATE_IN_PROGRESS || status == StackStatus.REVIEW_IN_PROGRESS);
            return status;
        } finally {
            System.out.println();
        }
    }

    private static ExecutionStatus monitorChangeSetExecutionStatus(AmazonCloudFormation client, String stackName, String changeSetName) {
        try {
            ExecutionStatus status, lastStatus = null;
            do {
                DescribeChangeSetResult describeChangeSetResult = client.describeChangeSet(new DescribeChangeSetRequest()
                        .withStackName(stackName)
                        .withChangeSetName(changeSetName));
                status = ExecutionStatus.valueOf(describeChangeSetResult.getExecutionStatus());

                if (status != lastStatus) {
                    System.out.print("\nExecution of change set for " + stackName + " is " + status + "  ");
                    lastStatus = status;
                } else {
                    System.out.print('.');
                }
                switch (status) {
                    case EXECUTE_COMPLETE:
                    case EXECUTE_FAILED:
                        return status;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Interrupt caught while monitoring stack creation. Ending process.");
                    System.exit(0); // Only interrupted if the monitoring process was killed.
                }
            } while (status == ExecutionStatus.AVAILABLE || status == ExecutionStatus.EXECUTE_IN_PROGRESS);
            return status;
        } finally {
            System.out.println();
        }
    }

    private static ChangeSetStatus monitorChangeSetCreationStatus(AmazonCloudFormation client, String stackName, String changeSetName) {
        try {
            ChangeSetStatus status, lastStatus = null;
            do {
                DescribeChangeSetResult describeChangeSetResult = client.describeChangeSet(new DescribeChangeSetRequest()
                        .withStackName(stackName)
                        .withChangeSetName(changeSetName));
                status = ChangeSetStatus.valueOf(describeChangeSetResult.getStatus());

                if (status != lastStatus) {
                    System.out.print("\nCreation of change set for " + stackName + " is " + status + "  ");
                    lastStatus = status;
                } else {
                    System.out.print('.');
                }
                switch (status) {
                    case CREATE_COMPLETE:
                    case FAILED:
                        if (describeChangeSetResult.getStatusReason() != null)
                            System.out.println("\n\tREASON: " + describeChangeSetResult.getStatusReason());
                        return status;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    System.out.println("Interrupt caught while monitoring stack creation. Ending process.");
                    System.exit(0); // Only interrupted if the monitoring process was killed.
                }
            } while (status == ChangeSetStatus.CREATE_IN_PROGRESS || status == ChangeSetStatus.CREATE_PENDING);
            return status;
        } finally {
            System.out.println();
        }
    }

    private static String readCloudFormationTemplateAndSubstituteProperties(String templateFilename, String bucketName,
                                                                            String objectName, String functionName) {
        List<String> lines;
        try {
            lines = Files.readAllLines(Paths.get(templateFilename));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        StringBuilder b = new StringBuilder();
        for (String line : lines) {
            b.append(line.replaceFirst("\\$\\{" + PROP_BUCKET_NAME + "\\}", bucketName)
                    .replaceFirst("\\$\\{" + PROP_OBJECT_NAME + "\\}", objectName)
                    .replaceFirst("\\$\\{" + PROP_LAMBDA_FUNCTION_NAME + "\\}", functionName));
            b.append('\n');
        }
        return b.toString();
    }

    private static void updateAndPublishLambdaFunction(AWSLambda client, String functionName, String bucketName,
                                                       String objectName, String fileName) {
        UpdateFunctionCodeResult updateFunctionResult = client.updateFunctionCode(new UpdateFunctionCodeRequest()
                .withFunctionName(functionName)
                .withS3Bucket(bucketName)
                .withS3Key(objectName)
                .withPublish(true));

        System.out.println("Updated function " + functionName + " with payload.");
        System.out.println("ARN: " + updateFunctionResult.getFunctionArn());
    }

    private static void sendPayloadToS3(AmazonS3 client, String bucketName, String objectName, File file) {
        try {
            client.putObject(bucketName, objectName, file);
        } catch (SdkClientException e) {
            throw new RuntimeException(e);
        }

        System.out.println("Uploaded payload to s3://" + bucketName + "/" + objectName);
    }

    private static boolean s3BucketHasVersioningEnabled(AmazonS3 client, String bucketName) {
        return client.getBucketVersioningConfiguration(bucketName).getStatus() == BucketVersioningConfiguration.ENABLED;
    }

    private static boolean s3BucketExists(AmazonS3 client, String bucketName) throws AmazonServiceException {
        try {
            System.out.println("About to check to see if bucket(" + bucketName + ") exists.");
            List<Bucket> buckets = client.listBuckets();
            buckets.forEach(System.out::println);
            long matchedBuckets = buckets.stream()
                    .filter(b -> b.getName().toLowerCase().contains(bucketName.toLowerCase()))
                    .count();
            if (matchedBuckets > 0) {
                System.out.println("Bucket(" + bucketName + ") exists.");
                return true;
            } else {
                System.out.println("Bucket(" + bucketName + ") does not exist.");
                return false;
            }
            //client.headBucket(new HeadBucketRequest(bucketName));
            //System.out.println("Bucket(" + bucketName + ") exists.");
            //return true; // if headBucket doesn't throw an exception, the bucket exists.
        } catch (AmazonServiceException e) {
            System.out.println("Bucket(" + bucketName + ") does not exist.");
            System.out.println("e.getStatusCode(): " + e.getStatusCode());
            System.out.println("e.getErrorMessage(): " + e.getErrorMessage());
            System.out.println("e.getErrorCode(): " + e.getErrorCode());
            System.out.println("e.toString(): " + e.toString());

            if (e.getStatusCode() != 200) {
                return false;
            } else {
                throw e;
            }
        }
    }

    private static boolean cloudFormationStackExists(AmazonCloudFormation cloudFormationClient, String stackName) {
        ListStacksResult listStacks = cloudFormationClient.listStacks();
        return listStacks.getStackSummaries().stream().anyMatch((stack) -> stack.getStackName().equals(stackName) &&
            stack.getDeletionTime() == null);
    }

    private static boolean lambdaFunctionExistsAndUsesJava8Runtime(AWSLambda client, String functionName) {
        // Ensure function exists in Lambda and uses Java 8 Runtime.
        GetFunctionResult getFunctionResult = client.getFunction(new GetFunctionRequest().withFunctionName(functionName));

        return getFunctionResult.getConfiguration().getRuntime().equals("java8");
    }

    private static void checkForErrors(AmazonWebServiceResult result, String attemptedOperationDescription) {
        if (result.getSdkHttpMetadata().getHttpStatusCode() != 200) {
            throw new RuntimeException("Attempt to " + attemptedOperationDescription + " failed, request ID = " +
                    result.getSdkResponseMetadata().getRequestId());
        }
    }

    private static AmazonS3 buildS3Client() {
        AmazonS3ClientBuilder builder = AmazonS3Client.builder();

        setCommonProperties(builder);

        return builder.build();
    }

    private static AmazonCloudFormation buildCloudFormationClient() {
        AmazonCloudFormationClientBuilder builder = AmazonCloudFormationClient.builder();

        setCommonProperties(builder);

        return builder.build();
    }

    private static AWSLambda buildLambdaClient() {
        AWSLambdaClientBuilder builder = AWSLambdaClient.builder();

        setCommonProperties(builder);

        return builder.build();
    }

    private static AwsSyncClientBuilder setCommonProperties(AwsSyncClientBuilder builder) {
        if (System.getProperty(PROP_AWS_REGION) != null) {
            builder.setRegion(System.getProperty(PROP_AWS_REGION));
        }
        return builder;
    }
}
