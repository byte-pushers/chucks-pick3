package software.bytepushers.pick3.services;

import com.amazonaws.services.lambda.invoke.LambdaFunction;

/**
 * Service implementation for the Lotto System
 */
public interface Pick3LottoSystemService {

    /**
     * The lambda function interface to invoke the lambda function
     *
     * @param winningNumber as a lucky number
     * @return the list of generated numbers.
     */
    @LambdaFunction(functionName = "bytepushers-chucks-pick3-lotto-system")
    int[][] generatePredictions(int winningNumber);
}