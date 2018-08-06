package software.bytepushers.pick3.api.v1;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
public class Pick3PlaysResponse {
    private String date;
    private String drawingTime;
    private List<Integer> plays = new ArrayList<>();
}
