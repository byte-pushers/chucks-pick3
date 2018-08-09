package software.bytepushers.pick3.services;

import software.bytepushers.pick3.api.v1.DrawingTime;

import java.time.LocalDate;

public interface Pick3PredictionService {

    int[][] predictPick3Plays(Integer winningNumber, LocalDate winningDrawDate, DrawingTime winningDrawTime,
                              LocalDate futureDrawDate, DrawingTime futureDrawTime, Integer numberOfPlaysToPredict);
}
