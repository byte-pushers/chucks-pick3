package software.bytepushers.pick3.domain;

import lombok.Getter;
import lombok.Setter;
import software.bytepushers.pick3.api.v1.DrawingTime;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class Pick3Plays {
    private LocalDate drawingDate;
    private DrawingTime drawingTime;
    private List<Integer> plays;
}
