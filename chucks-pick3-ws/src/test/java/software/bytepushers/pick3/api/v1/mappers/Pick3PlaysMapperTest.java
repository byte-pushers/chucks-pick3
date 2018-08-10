package software.bytepushers.pick3.api.v1.mappers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mapstruct.ap.internal.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;

@ContextConfiguration(classes = Pick3PlaysMapperTest.SpringTestConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class Pick3PlaysMapperTest {

    @Configuration
    @ComponentScan(basePackageClasses = Pick3PlaysMapper.class)
    public static class SpringTestConfig{
    }

    @Autowired
    private Pick3PlaysMapper mapper;

    private Pick3Plays plays;

    @Before
    public void before() {
        plays = new Pick3Plays();
    }

    @Test
    public void testMapsDrawingTimeToResponse() {
        plays.setDrawingTime(DrawingTime.DAY);

        Pick3PlaysResponse response = mapper.pick3PlaysToPick3PlaysResponse(plays);

        assertThat(response.getDrawingTime()).isEqualTo(DrawingTime.DAY.toString());
    }

    @Test
    public void testMapsDrawingDateToResponse() {
        LocalDate date = LocalDate.now();
        plays.setDrawingDate(date);

        Pick3PlaysResponse response = mapper.pick3PlaysToPick3PlaysResponse(plays);

        assertThat(response.getDate()).isEqualTo(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
    }

    @Test
    public void testMapsPlaysToResponse() {
        plays.setPlays(Collections.newArrayList(123, 456, 789));

        Pick3PlaysResponse response = mapper.pick3PlaysToPick3PlaysResponse(plays);

        assertThat(response.getPlays()).containsExactlyInAnyOrder(123, 456, 789);
    }
}
