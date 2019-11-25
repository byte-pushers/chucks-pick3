package software.bytepushers.pick3.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Component
public final class LocalDateConverter implements Converter<String, LocalDate> {

    private DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE;

    public LocalDateConverter() {

    }

    public LocalDateConverter(String dateFormat) {
        this.formatter = DateTimeFormatter.ofPattern(dateFormat);
    }

    @Override
    public LocalDate convert(String source) {
        if (source == null || source.isEmpty()) {
            return null;
        }
        return LocalDate.parse(source, DateTimeFormatter.ISO_DATE);
    }
}
