package software.bytepushers.pick3.util;

import org.mapstruct.ap.internal.util.Collections;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;

public abstract class Answers {
    public static Answer<Pick3Plays> genericPick3Plays() {
        return (InvocationOnMock iom) -> {
            Pick3Plays result = new Pick3Plays();

            result.setPlays(Collections.newArrayList(123, 234, 345));
            result.setDrawingDate(iom.getArgument(3));
            result.setDrawingTime(iom.getArgument(4));

            return result;
        };
    }


    public static Answer<Pick3PlaysResponse> genericPick3PlaysResponse() {
        return (InvocationOnMock iom) -> {
            Pick3Plays plays = iom.getArgument(0);

            Pick3PlaysResponse result = new Pick3PlaysResponse();
            result.setPlays(plays.getPlays());
            result.setDate(plays.getDrawingDate().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
            result.setDrawingTime(plays.getDrawingTime().toString());

            return result;
        };
    }

    public static Answer<int[][]> randomWinningNumberResponse() {
        return (InvocationOnMock ioc) -> {
            int numResponses = 10;
            int[][] result = new int[numResponses][3];
            for (int i = 0; i < numResponses; ++i) {
                result[i] = new int[] {(int)(10*Math.random()), (int)(10*Math.random()), (int)(10*Math.random()) };
            }
            return result;
        };
    }
}
