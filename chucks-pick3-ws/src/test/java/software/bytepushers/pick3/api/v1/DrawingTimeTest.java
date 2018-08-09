package software.bytepushers.pick3.api.v1;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class DrawingTimeTest {

    @Test
    public void testValueOfMorning() {
        assertThat(DrawingTime.valueOf("MORNING")).isNotNull();
    }

    @Test
    public void testValueOfDay() {
        assertThat(DrawingTime.valueOf("DAY")).isNotNull();
    }

    @Test
    public void testValueOfEvening() {
        assertThat(DrawingTime.valueOf("EVENING")).isNotNull();
    }

    @Test
    public void testValueOfNight() {
        assertThat(DrawingTime.valueOf("NIGHT")).isNotNull();
    }
}
