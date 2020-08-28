package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("aws")
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    private final static Logger LOGGER = LoggerFactory.getLogger(Pick3PredictionServiceImpl.class);

    private final AWSLambda awsLambda;

    public Pick3PredictionServiceImpl(AWSLambda awsLambda) {
        this.awsLambda = awsLambda;
    }

    @Override
    public int[][] generatePredictions(int winningNumber) {
        LOGGER.info("generatePredictions() method - start.");
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(this.awsLambda)
                .build(Pick3LottoSystemService.class);

        LOGGER.info("generatePredictions() method - about to invoke lambda function.");
        int[][] predictions = pick3PredictionService.generatePredictions(winningNumber);

        LOGGER.info("generatePredictions() method - predictions.length: {}", predictions.length);
        LOGGER.info("generatePredictions() method - end.");
        return predictions;
    }
}
