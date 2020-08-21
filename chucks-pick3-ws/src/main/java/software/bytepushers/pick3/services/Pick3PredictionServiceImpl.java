package software.bytepushers.pick3.services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("aws")
@Service
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    @Override
    public int[][] generatePredictions(int winningNumber) {
        System.out.println("generatePredictions() method - start.");
        AWSLambda awsLambda = AWSLambdaClientBuilder.standard().withRegion(Regions.US_EAST_2).build();
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(awsLambda)
                .build(Pick3LottoSystemService.class);

        System.out.println("generatePredictions() method - about to invoke lambda function.");
        int[][] predictions = pick3PredictionService.generatePredictions(winningNumber);

        System.out.println("generatePredictions() method - predictions.length: " + predictions.length);
        System.out.println("generatePredictions() method - end.");
        return predictions;
    }
}
