package software.bytepushers.pick3.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class of AWS Service Beans
 */
@Configuration
public class AWSConfiguration {

    /**
     * Aws lambda bean configuration.
     *
     * @return the instance of {@link AWSLambda}
     */
    @Bean
    public AWSLambda awsLambda() {
        return AWSLambdaClientBuilder.standard().withRegion(Regions.US_EAST_2).build();
    }

}
