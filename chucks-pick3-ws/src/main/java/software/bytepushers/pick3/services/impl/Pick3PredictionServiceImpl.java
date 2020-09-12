package software.bytepushers.pick3.services.impl;

import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import software.bytepushers.pick3.services.Pick3LottoSystemService;
import software.bytepushers.pick3.services.Pick3PredictionService;

@Service
@Profile("aws")
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    private final static Logger LOGGER = LogManager.getLogger();

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
