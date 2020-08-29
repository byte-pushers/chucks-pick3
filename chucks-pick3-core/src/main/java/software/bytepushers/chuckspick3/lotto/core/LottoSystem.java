package software.bytepushers.chuckspick3.lotto.core;

import java.util.Random;
import java.util.stream.IntStream;

public class LottoSystem {

    private final static Random RANDOM = new Random();

    public static int[][] processNumber(Integer previousWinningNumber) {
        return IntStream.range(0, 5).mapToObj(c -> IntStream.range(0, 3)
                .map(r -> RANDOM.nextInt(10)).toArray()).toArray(int[][]::new);
    }
}
