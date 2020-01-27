package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("aws")
@Service
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    @Override
    public int[][] generatePredictions(int winningNumber) {
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(AWSLambdaClientBuilder.defaultClient())
                .build(Pick3LottoSystemService.class);

        return pick3PredictionService.generatePredictions(winningNumber);
    }
}
