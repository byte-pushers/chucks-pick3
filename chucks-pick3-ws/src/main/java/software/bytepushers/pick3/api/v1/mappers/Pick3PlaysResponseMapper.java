package software.bytepushers.pick3.api.v1.mappers;

import org.springframework.stereotype.Component;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

@Component
public class Pick3PlaysResponseMapper implements Pick3PlaysMapper {
    // private DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
    @Override
    public Pick3PlaysResponse pick3PlaysToPick3PlaysResponse(Pick3Plays pick3Plays) {
        Pick3PlaysResponse response = null;

        if (pick3Plays != null) {
            response = new Pick3PlaysResponse();
            if (pick3Plays.getDrawingDate() != null) response.setDate(pick3Plays.getDrawingDate().toString());
            if (pick3Plays.getDrawingTime() != null) response.setDrawingTime(pick3Plays.getDrawingTime().name());
            response.setPlays(pick3Plays.getPlays());
        }

        return response;
    }
}
