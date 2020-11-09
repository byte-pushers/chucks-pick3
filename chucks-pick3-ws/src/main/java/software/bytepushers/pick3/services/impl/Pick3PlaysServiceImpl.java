package software.bytepushers.pick3.services.impl;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.domain.Pick3Plays;
import software.bytepushers.pick3.services.Pick3PlaysService;
import software.bytepushers.pick3.services.Pick3PredictionService;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.stream.Collectors;

/**
 * Service layer implementation for the play service
 */
@Log4j2
@Service
public class Pick3PlaysServiceImpl implements Pick3PlaysService {

    private final Pick3PredictionService pick3PredictionService;

    public Pick3PlaysServiceImpl(Pick3PredictionService pick3PredictionService) {
        this.pick3PredictionService = pick3PredictionService;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Pick3Plays getPick3Plays(Integer winningNumber, LocalDate winningDrawDate, DrawingTime winningDrawTime,
                                    LocalDate futureDrawDate, DrawingTime futureDrawTime) {
        log.info("getPick3Plays() method - start.");
        log.info("getPick3Plays() method - about to generate numbers.");
        int[][] predictions = pick3PredictionService.generatePredictions(winningNumber);
        log.info("getPick3Plays() method - numbers generated.");
        Pick3Plays result = new Pick3Plays();

        result.setPlays(Arrays.stream(predictions)
                .map(digits -> digits[0] * 100 + digits[1] * 10 + digits[2])
                .collect(Collectors.toList()));

        result.setDrawingDate(futureDrawDate);
        result.setDrawingTime(futureDrawTime);

        return result;
    }
}
