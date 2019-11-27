package software.bytepushers.pick3.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import software.bytepushers.pick3.converter.LocalDateConverter;
import software.bytepushers.pick3.converter.LocalDateTimeConverter;

@Configuration
@ComponentScan("software.bytepushers.pick3")
@EnableAutoConfiguration
@PropertySource("classpath:application.yml")
public class SpringApiConfig {
}