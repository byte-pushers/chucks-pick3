package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.invoke.LambdaFunction;
import software.bytepushers.pick3.api.v1.DrawingTime;

import java.time.LocalDate;

public interface Pick3PredictionService {
    @LambdaFunction(functionName="bytepushers-chucks-pick3-lotto-system") int[][] generatePredictions(int winningNumber);
}
