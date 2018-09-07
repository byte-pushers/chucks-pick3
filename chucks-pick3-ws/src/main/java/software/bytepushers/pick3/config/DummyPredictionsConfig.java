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
        return (Pick3PredictionService) (winningNumber, winningDrawDate, winningDrawTime, futureDrawDate, futureDrawTime, numberOfPlaysToPredict) -> {
            int[][] result = new int[numberOfPlaysToPredict][];
            for (int i = 0; i < numberOfPlaysToPredict; ++i) {
                result[i] = new int[] {(int)(10*Math.random()), (int)(10*Math.random()), (int)(10*Math.random())};
            }
            return result;
        };
    }
}
