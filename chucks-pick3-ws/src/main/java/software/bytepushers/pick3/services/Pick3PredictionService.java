package software.bytepushers.pick3.services;

import software.bytepushers.pick3.api.v1.DrawingTime;

import java.util.Date;

public interface Pick3PredictionService {

    int[][] predictPick3Plays(Integer winningNumber, Date winningDrawDate, DrawingTime winningDrawTime,
                              Date futureDrawDate, DrawingTime futureDrawTime, Integer numberOfPlaysToPredict);
}
