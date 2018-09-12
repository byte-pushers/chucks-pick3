package software.bytepushers.pick3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import software.bytepushers.pick3.services.Pick3PredictionService;

@Configuration
@Profile("dev")
public class DummyPredictionsConfig {
    @Bean
    Pick3PredictionService pick3PredictionService() {
        return new Pick3PredictionService() {
            public int[][] generatePredictions(int winningNumber) {
                int[][] result = getPredictions(35);
                return result;
            }

            int[][] getPredictions(int totalPredictions) {
                int[][] result = new int[totalPredictions][];

                for (int i = 0; i < totalPredictions; ++i) {
                    result[i] = new int[]{(int) (10 * Math.random()), (int) (10 * Math.random()), (int) (10 * Math.random())};
                }

                return result;
            }
        };
    }
}
