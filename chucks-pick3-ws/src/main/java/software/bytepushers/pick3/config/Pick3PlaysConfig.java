package software.bytepushers.pick3.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@Component
@Getter
public class Pick3PlaysConfig {

    @Value("pick3.config.numPlaysToPredict")
    Integer numPlaysToPredict;

}
