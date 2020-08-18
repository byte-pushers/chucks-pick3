package software.bytepushers.chuckspick3.lotto.core;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import java.util.Vector;

public class LottoSystemLambdaHandler implements RequestHandler<Integer, Vector<Vector<Integer>>> {

    @Override
    public Vector<Vector<Integer>> handleRequest(Integer previousWinningNumber, Context context) {
        context.getLogger().log("Previous Winning Number: " + previousWinningNumber);
        LottoSystem lotto = new LottoSystem();
        Vector<Vector<Integer>> outcomes = lotto.processNumber(previousWinningNumber);
        return outcomes;
    }
}
