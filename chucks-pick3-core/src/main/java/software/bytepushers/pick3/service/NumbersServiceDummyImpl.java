package software.bytepushers.pick3.service;

import software.bytepushers.pick3.api.DrawingTime;
import software.bytepushers.pick3.api.State;

import java.util.Date;

/**
 * Used for testing NumbersService
 */
public class NumbersServiceDummyImpl implements NumbersService {
    @Override
    public int[] getNumbers(int winningNumber, State state, Date date, DrawingTime time) {
        int[] result = new int[30];
        for (int i = 0; i < 30; ++i) {
            result[i] = i * 20;
        }
        return result;
    }
}
