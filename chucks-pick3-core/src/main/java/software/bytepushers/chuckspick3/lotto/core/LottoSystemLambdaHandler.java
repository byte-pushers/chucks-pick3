package software.bytepushers.chuckspick3.lotto.core;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.List;

public class LottoSystemLambdaHandler implements RequestHandler<Integer, int[][]> {

    @Override
    public int[][] handleRequest(Integer previousWinningNumber, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("Previous Winning Number: " + previousWinningNumber);
        return LottoSystem.processNumber(previousWinningNumber);
    }
}
