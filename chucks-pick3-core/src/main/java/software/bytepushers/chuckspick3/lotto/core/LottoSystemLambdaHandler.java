package software.bytepushers.chuckspick3.lotto.core;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.List;
import java.util.Map;

public class LottoSystemLambdaHandler implements RequestHandler<Map<String, Object>, int[][]> {

    @Override
    public int[][] handleRequest(Map<String, Object> input, Context context) {
        LambdaLogger logger = context.getLogger();
        Integer previousWinningNumber = (Integer) input.get("previousWinningNumber");
        logger.log("Previous Winning Number: " + previousWinningNumber);
        return LottoSystem.processNumber(previousWinningNumber);
    }
}
