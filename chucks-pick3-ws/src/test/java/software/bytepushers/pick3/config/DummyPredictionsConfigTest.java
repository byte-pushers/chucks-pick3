package software.bytepushers.pick3.config;


import org.junit.Before;
import org.junit.Test;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.services.Pick3PredictionService;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

public class DummyPredictionsConfigTest {

    private DummyPredictionsConfig underTest;

    @Before
    public void before() {
        underTest = new DummyPredictionsConfig();
    }

    @Test
    public void testPredictionsServiceReturnsCorrectNumberOfPlays() {
        Pick3PredictionService dummySvc = underTest.pick3PredictionService();

        int n = 30;
        int[][] results = dummySvc.predictPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(),
                DrawingTime.NIGHT, n);

        assertThat(results).hasSize(n);
    }

    @Test
    public void testPredictionsServiceResultsAreAllInBounds() {
        Pick3PredictionService dummySvc = underTest.pick3PredictionService();

        int n = 30;
        int[][] results = dummySvc.predictPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(),
                DrawingTime.NIGHT, n);

        for (int i = 0; i < n; ++i) {
            assertThat(results[i]).hasSize(3);
            for (int j = 0; j < 3; ++j) {
                assertThat(results[i][j]).isBetween(0, 9);
            }
        }
    }
}
