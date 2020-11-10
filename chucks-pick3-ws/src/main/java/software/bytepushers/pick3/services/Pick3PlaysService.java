package software.bytepushers.pick3.services;

import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.time.LocalDate;

/**
 * Service layer for the play service
 */
public interface Pick3PlaysService {

    /**
     * The method implementation si responsible for retrieving the required details of the draw details.
     *
     * @param winningNumber
     * @param winningDrawDate
     * @param winningDrawTime
     * @param futureDrawDate
     * @param futureDrawTime
     * @return the draw details.
     */
    Pick3Plays getPick3Plays(Integer winningNumber, LocalDate winningDrawDate, DrawingTime winningDrawTime,
                             LocalDate futureDrawDate, DrawingTime futureDrawTime);
}
