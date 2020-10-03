package software.bytepushers.pick3.converter;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import javax.annotation.Nullable;
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
    public LocalDate convert(@Nullable String source) {
        if (StringUtils.isBlank(source)) {
            return null;
        }
        return LocalDate.parse(source, this.formatter);
    }
}
