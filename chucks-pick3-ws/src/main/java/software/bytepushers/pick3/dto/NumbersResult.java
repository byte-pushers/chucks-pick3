package software.bytepushers.pick3.dto;

import lombok.Data;

import software.bytepushers.pick3.api.DrawingTime;
import software.bytepushers.pick3.api.State;

@Data
public class NumbersResult {
    State drawingState;
    DrawingTime drawingTime;
    int[] drawingNumbers;
}
