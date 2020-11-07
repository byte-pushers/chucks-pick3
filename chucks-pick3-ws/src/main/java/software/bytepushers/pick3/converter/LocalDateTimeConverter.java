package software.bytepushers.pick3.converter;

import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * Custom LocalDateTime converter from {@link String} to {@link LocalDateTime}
 */
@Component
public final class LocalDateTimeConverter implements Converter<String, LocalDateTime> {

    private final DateTimeFormatter formatter;

    public LocalDateTimeConverter() {
        this.formatter = DateTimeFormatter.ISO_DATE;
    }

    public LocalDateTimeConverter(String dateFormat) {
        this.formatter = DateTimeFormatter.ofPattern(dateFormat);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocalDateTime convert(@NotNull String source) {
        return StringUtils.isBlank(source) ? null : LocalDateTime.parse(source, this.formatter);
    }
}
