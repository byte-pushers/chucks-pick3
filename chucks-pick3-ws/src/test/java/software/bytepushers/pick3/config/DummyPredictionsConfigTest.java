package software.bytepushers.pick3.config;


import org.junit.Before;
import org.junit.Test;
import software.bytepushers.pick3.config.DummyPredictionsConfig;
import software.bytepushers.pick3.services.Pick3PredictionService;

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

        int n = 35;
        int[][] results = dummySvc.generatePredictions(123);

        assertThat(results).hasSize(n);
    }

    @Test
    public void testPredictionsServiceResultsAreAllInBounds() {
        Pick3PredictionService dummySvc = underTest.pick3PredictionService();

        int n = 35;
        int[][] results = dummySvc.generatePredictions(123);

        for (int i = 0; i < n; ++i) {
            assertThat(results[i]).hasSize(3);
            for (int j = 0; j < 3; ++j) {
                assertThat(results[i][j]).isBetween(0, 9);
            }
        }
    }
}
