package software.bytepushers.pick3.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import static org.springframework.http.HttpMethod.*;

/**
 * Enable CORS for the all requests
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    /**
     * {@inheritDoc}
     *
     * @param registry to configure the CORS origin attributes
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedMethods(GET.name(), HEAD.name(), POST.name(),
                PUT.name(), DELETE.name(), OPTIONS.name(), HEAD.name());
    }
}
