package software.bytepushers.pick3.services.impl;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
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

    @Autowired
    @Lazy
    private Pick3LottoSystemService pick3LottoSystemService;

    /**
     * {@inheritDoc}
     */
    @Override
    public int[][] generatePredictions(int winningNumber) {
        log.info("generatePredictions() method - start.");

        log.info("generatePredictions() method - about to invoke lambda function.");
        int[][] predictions = this.pick3LottoSystemService.generatePredictions(winningNumber);

        log.info("generatePredictions() method - predictions.length: {}", predictions.length);
        log.info("generatePredictions() method - end.");
        return predictions;
    }
}
