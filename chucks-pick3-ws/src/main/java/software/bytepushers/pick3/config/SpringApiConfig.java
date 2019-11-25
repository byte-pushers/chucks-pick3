package software.bytepushers.pick3.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.ConversionServiceFactoryBean;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import software.bytepushers.pick3.converter.LocalDateConverter;
import software.bytepushers.pick3.converter.LocalDateTimeConverter;

import java.util.HashSet;
import java.util.Set;

@Configuration
@ComponentScan("software.bytepushers.pick3")
@EnableAutoConfiguration
@PropertySource("classpath:application.yml")
public class SpringApiConfig implements WebMvcConfigurer{

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new LocalDateConverter("yyyy-MM-dd"));
        registry.addConverter(new LocalDateTimeConverter("yyyy-MM-dd'T'HH:mm:ss.SSS"));
    }

    private static final String dateFormat = "yyyy-MM-dd";
    private static final String dateTimeFormat = "yyyy-MM-dd HH:mm:ss";

    @Bean(name="conversionService")
    public ConversionService conversionService() {
        ConversionServiceFactoryBean bean = new ConversionServiceFactoryBean();
        bean.setConverters(this.getConverters());
        bean.afterPropertiesSet();
        return bean.getObject();
    }

    private Set<?> getConverters() {
        Set <Converter<String, ?>> converters = new HashSet<>();

        converters.add(new LocalDateConverter("yyyy-MM-dd"));
        converters.add(new LocalDateTimeConverter("yyyy-MM-dd'T'HH:mm:ss.SSS"));
        return converters;
    }
}