package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.invoke.LambdaFunction;

public interface Pick3LottoSystemService {

    @LambdaFunction(functionName = "bytepushers-chucks-pick3-lotto-system")
    int[][] generatePredictions(int winningNumber);
}
