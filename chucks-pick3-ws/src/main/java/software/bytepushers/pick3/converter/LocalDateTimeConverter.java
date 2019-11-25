package software.bytepushers.pick3.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public final class LocalDateTimeConverter implements Converter<String, LocalDateTime> {

    private DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

    public LocalDateTimeConverter() {
    }

    public LocalDateTimeConverter(String dateFormat) {
        this.formatter = DateTimeFormatter.ofPattern(dateFormat);
    }

    @Override
    public LocalDateTime convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }

        return LocalDateTime.parse(source, formatter);
    }
}