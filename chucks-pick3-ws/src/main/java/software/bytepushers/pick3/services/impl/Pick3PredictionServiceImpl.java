package software.bytepushers.pick3.services.impl;

import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import software.bytepushers.pick3.services.Pick3LottoSystemService;
import software.bytepushers.pick3.services.Pick3PredictionService;

/**
 * Service layer implementation for the prediction numbers.
 */
@Log4j2
@Service
@Profile("aws")
public class Pick3PredictionServiceImpl implements Pick3PredictionService {

    private final AWSLambda awsLambda;

    public Pick3PredictionServiceImpl(AWSLambda awsLambda) {
        this.awsLambda = awsLambda;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public int[][] generatePredictions(int winningNumber) {
        log.info("generatePredictions() method - start.");
        final Pick3LottoSystemService pick3PredictionService = LambdaInvokerFactory.builder()
                .lambdaClient(this.awsLambda)
                .build(Pick3LottoSystemService.class);

        log.info("generatePredictions() method - about to invoke lambda function.");
        int[][] predictions = pick3PredictionService.generatePredictions(winningNumber);

        log.info("generatePredictions() method - predictions.length: {}", predictions.length);
        log.info("generatePredictions() method - end.");
        return predictions;
    }
}
