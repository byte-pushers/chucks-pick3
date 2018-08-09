package software.bytepushers.pick3.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@Getter
@PropertySource("classpath:application.yml")
public class Pick3PlaysConfig {

    @Value("${config.numPlaysToPredict:10}")
    Integer numPlaysToPredict;

}
