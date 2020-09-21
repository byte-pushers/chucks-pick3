package software.bytepushers.pick3.converter;

import org.apache.commons.lang3.StringUtils;
import org.jetbrains.annotations.NotNull;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Custom LocalDate converter from {@link String} to {@link LocalDate}
 */
@Component
public final class LocalDateConverter implements Converter<String, LocalDate> {

    private final DateTimeFormatter formatter;

    public LocalDateConverter() {
        this.formatter = DateTimeFormatter.ISO_DATE;
    }

    public LocalDateConverter(String dateFormat) {
        this.formatter = DateTimeFormatter.ofPattern(dateFormat);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public LocalDate convert(@NotNull String source) {
        return StringUtils.isBlank(source) ? null : LocalDate.parse(source, this.formatter);
    }
}
