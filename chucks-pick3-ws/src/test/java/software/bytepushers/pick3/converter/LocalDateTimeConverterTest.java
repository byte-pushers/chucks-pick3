package software.bytepushers.pick3.converter;

import org.junit.Test;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class LocalDateTimeConverterTest {

    @Test
    public void testLocalDateConvertor() {
        LocalDateTimeConverter localDateConverter = new LocalDateTimeConverter();
        LocalDateTime currentDate = LocalDateTime.now();
        LocalDateTime convertedDate = localDateConverter.convert(currentDate.toString());
        assert currentDate.equals(convertedDate) : "DateTime must be converted in valid form";
    }

    @Test
    public void testLocalDateCustomFormatterConvertor() {
        String customDatePattern = "yyyy-MM-dd-HH-mm-ss";
        String customDate = "2020-10-01-22-30-30";
        LocalDateTimeConverter localDateConverter = new LocalDateTimeConverter(customDatePattern);
        LocalDateTime convertedDate = localDateConverter.convert(customDate);
        assert Objects.requireNonNull(convertedDate).format(DateTimeFormatter.ofPattern(customDatePattern)).equals(customDate)
                : "LocalDateTime converter should support custom patterns";
    }

    @Test
    public void testLocalDateIfSuppliedStringIsNull() {
        LocalDateTimeConverter localDateConverter = new LocalDateTimeConverter();
        LocalDateTime convertedDate = localDateConverter.convert(null);
        assert convertedDate == null : "Null input must return null type LocalDateTime instance";
    }

    @Test
    public void testLocalDateIfSuppliedStringIsEmpty() {
        LocalDateTimeConverter localDateConverter = new LocalDateTimeConverter();
        LocalDateTime convertedDate = localDateConverter.convert("");
        assert convertedDate == null : "Empty input must return null type LocalDateTime instance";
    }

}
