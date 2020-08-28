package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("aws")
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    private final AWSLambda awsLambda;

    public Pick3PredictionServiceImpl(AWSLambda awsLambda) {
        this.awsLambda = awsLambda;
    }

    @Override
    public int[][] generatePredictions(int winningNumber) {
        System.out.println("generatePredictions() method - start.");
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(this.awsLambda)
                .build(Pick3LottoSystemService.class);

        System.out.println("generatePredictions() method - about to invoke lambda function.");
        int[][] predictions = pick3PredictionService.generatePredictions(winningNumber);

        System.out.println("generatePredictions() method - predictions.length: " + predictions.length);
        System.out.println("generatePredictions() method - end.");
        return predictions;
    }
}
