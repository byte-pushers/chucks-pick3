package software.bytepushers.pick3.config;

import com.amazonaws.regions.Regions;
import com.amazonaws.services.lambda.AWSLambda;
import com.amazonaws.services.lambda.AWSLambdaClientBuilder;
import com.amazonaws.services.lambda.invoke.LambdaInvokerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import software.bytepushers.pick3.services.Pick3LottoSystemService;

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

    @Bean
    @Lazy
    public Pick3LottoSystemService pick3LottoSystemService(AWSLambda awsLambda) {
        return LambdaInvokerFactory.builder().lambdaClient(awsLambda).build(Pick3LottoSystemService.class);
    }

}
