package software.bytepushers.pick3.services;

import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.time.LocalDate;

public interface Pick3PlaysService {
    Pick3Plays getPick3Plays(Integer winningNumber, LocalDate winningDrawDate, DrawingTime winningDrawTime,
                             LocalDate futureDrawDate, DrawingTime futureDrawTime);
}
