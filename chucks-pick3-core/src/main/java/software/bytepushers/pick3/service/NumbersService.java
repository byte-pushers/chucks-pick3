package software.bytepushers.pick3.service;

import software.bytepushers.pick3.api.DrawingTime;
import software.bytepushers.pick3.api.State;

import java.util.Date;

public interface NumbersService {
    int[] getNumbers(int winningNumber, State state, Date date, DrawingTime time);
}
