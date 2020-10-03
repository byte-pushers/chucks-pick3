package software.bytepushers.pick3.converter;

import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public final class LocalDateTimeConverter implements Converter<String, LocalDateTime> {

    private DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    public LocalDateTimeConverter() {
    }

    public LocalDateTimeConverter(String dateFormat) {
        this.formatter = DateTimeFormatter.ofPattern(dateFormat);
    }

    @Override
    public LocalDateTime convert(@Nullable String source) {
        if (StringUtils.isBlank(source)) {
            return null;
        }
        return LocalDateTime.parse(source, formatter);
    }
}