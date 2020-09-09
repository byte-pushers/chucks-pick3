package software.bytepushers.pick3.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Security Configuration class for the  application
 */
@Configuration
public class SecurityConfiguration {

    /**
     * The bean configuration of the {@link BCryptPasswordEncoder}
     *
     * @return the single instance of password encoder.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
