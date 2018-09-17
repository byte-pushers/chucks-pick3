package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.stereotype.Service;

@Service
public class Pick3PredcitionServiceImpl implements Pick3PredictionService {

    @Override
    public int[][] generatePredictions(int winningNumber) {
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(AWSLambdaClientBuilder.defaultClient())
                .build(Pick3LottoSystemService.class);

        return pick3PredictionService.generatePredictions(winningNumber);
    }
}
