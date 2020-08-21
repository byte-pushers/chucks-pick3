package software.bytepushers.chuckspick3.lotto.core;

import java.util.Random;
import java.util.stream.IntStream;

public class LottoSystem {

    private final static Random RANDOM = new Random();

    public static int[][] processNumber(Integer previousWinningNumber) {
        // TODO: Populate the outcomes with a data that looks like this: // [[1,2,3], [4,5,6]]
        return IntStream.range(0, 5).mapToObj(c -> IntStream.range(0, 3)
                .map(r -> RANDOM.nextInt(10)).toArray()).toArray(int[][]::new);
    }
}
