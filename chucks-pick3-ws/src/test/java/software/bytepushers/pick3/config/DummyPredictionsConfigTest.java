package software.bytepushers.pick3.config;


import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import software.bytepushers.pick3.services.Pick3LottoSystemService;
import software.bytepushers.pick3.services.Pick3PredictionService;
import software.bytepushers.pick3.services.impl.Pick3PredictionServiceImpl;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(MockitoExtension.class)
public class DummyPredictionsConfigTest {

    private DummyPredictionsConfig underTest;

    @Mock
    private Pick3LottoSystemService pick3LottoSystemService;

    @InjectMocks
    private Pick3PredictionServiceImpl pick3PredictionService;

    @Before
    public void before() {
        underTest = new DummyPredictionsConfig();
        MockitoAnnotations.initMocks(this);
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

    @Test
    public void testAwsLambdaPredictionsService() {
        int n = 35;
        int[][] mockResult = new int[n][3];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < mockResult[i].length; j++) {
                mockResult[i][j] = i + j;
            }
        }
        Mockito.when(this.pick3LottoSystemService.generatePredictions(n)).thenReturn(mockResult);
        int[][] results = this.pick3PredictionService.generatePredictions(n);
        for (int i = 0; i < n; ++i) {
            assertThat(results[i]).hasSize(3);
            for (int j = 0; j < 3; ++j) {
                assertThat(results[i][j]).isBetween(0, n + 1);
            }
        }
    }
}
