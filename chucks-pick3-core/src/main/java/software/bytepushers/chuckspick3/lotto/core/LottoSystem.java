package software.bytepushers.chuckspick3.lotto.core;

import java.util.Random;
import java.util.stream.IntStream;

public class LottoSystem {

    private final static Random RANDOM = new Random();

    private final static int MIN_PICKS = 20;

    private final static int HIGH_PICKS = 50;

    public static int[][] processNumber(Integer previousWinningNumber) {
        int picksRange = RANDOM.nextInt(HIGH_PICKS - MIN_PICKS) + MIN_PICKS;
        return IntStream.range(0, picksRange).mapToObj(c -> IntStream.range(0, 3)
                .map(r -> RANDOM.nextInt(10)).toArray()).toArray(int[][]::new);
    }
}
