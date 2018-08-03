package software.bytepushers.pick3.services;

import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.util.Date;

public interface Pick3PlaysService {
    Pick3Plays getPick3Plays(Integer winningNumber, Date winningDrawDate, DrawingTime winningDrawTime,
                             Date futureDrawDate, DrawingTime futureDrawTime);
}
