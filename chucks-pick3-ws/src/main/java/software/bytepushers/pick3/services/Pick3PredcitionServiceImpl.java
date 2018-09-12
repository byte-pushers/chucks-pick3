package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.stereotype.Service;

@Service
public class Pick3PredcitionServiceImpl implements Pick3PredictionService {

    @Override
    public int[][] generatePredictions(int winningNumber) {
        final Pick3PredictionService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(AWSLambdaClientBuilder.defaultClient())
                .build(Pick3PredictionService.class);

        return pick3PredictionService.generatePredictions(winningNumber);
    }

    /*private void runWithPayload(String functionName, String payload) throws JsonParseException, IOException {
        // (1) Define the AWS Region in which the function is to be invoked
        //Regions region = Regions.fromName("us-east-1");

        // (2) Instantiate AWSLambdaClientBuilder to build the Lambda client
        AWSLambdaClientBuilder builder = AWSLambdaClientBuilder.standard().withRegion(Regions.US_EAST_1);

        // (3) Build the client, which will ultimately invoke the function
        //AWSLambdaClient client = new AWSLambdaClient();
        //client.withRegion(Regions.US_EAST_1);
        AWSLambda client = builder.build();

        // (4) Create an InvokeRequest with required parameters
        //InvokeRequest request = new InvokeRequest();
        //request.withFunctionName(functionName).withPayload(payload);
        InvokeRequest request = new InvokeRequest().withFunctionName("bytepushers-chucks-pick3-lotto-system").withPayload(payload); // optional

        // (5) Invoke the function and capture response
        InvokeResult response = client.invoke(request);

        // (6) Handle result
        System.out.println("Result invoking " + functionName + ": " + response);

        ByteBuffer byteBuffer = response.getPayload();

        String jsonString = StandardCharsets.UTF_8.decode(byteBuffer).toString();
        ObjectMapper mapper = new ObjectMapper();
        JsonNode responseJsonObject = mapper.readTree(jsonString);
        System.out.println("JSON Result invoking " + functionName + ": isArray(): " + responseJsonObject.isArray());
        System.out.println("JSON Result invoking " + functionName + ": string value: " + responseJsonObject.toString());
    }*/
}
