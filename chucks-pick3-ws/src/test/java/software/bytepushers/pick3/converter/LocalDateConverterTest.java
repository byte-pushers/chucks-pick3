package software.bytepushers.pick3.converter;

import org.junit.Test;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

public class LocalDateConverterTest {

    @Test
    public void testLocalDateConvertor() {
        LocalDateConverter localDateConverter = new LocalDateConverter();
        LocalDate currentDate = LocalDate.now();
        LocalDate convertedDate = localDateConverter.convert(currentDate.toString());
        assert currentDate.equals(convertedDate) : "Date must be converted in valid form";
    }

    @Test
    public void testLocalDateCustomFormatterConvertor() {
        String customDatePattern = "dd/MM/yyyy";
        String customDate = "24/12/2020";
        LocalDateConverter localDateConverter = new LocalDateConverter(customDatePattern);
        LocalDate convertedDate = localDateConverter.convert(customDate);
        assert Objects.requireNonNull(convertedDate).format(DateTimeFormatter.ofPattern(customDatePattern)).equals(customDate)
                : "Local Date converter should support custom patterns";
    }

    @Test
    public void testLocalDateIfSuppliedStringIsNull() {
        LocalDateConverter localDateConverter = new LocalDateConverter();
        LocalDate convertedDate = localDateConverter.convert(null);
        assert convertedDate == null : "Null input must return null type local date instance";
    }

    @Test
    public void testLocalDateIfSuppliedStringIsEmpty() {
        LocalDateConverter localDateConverter = new LocalDateConverter();
        LocalDate convertedDate = localDateConverter.convert("");
        assert convertedDate == null : "Empty input must return null type local date instance";
    }

}
