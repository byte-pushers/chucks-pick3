package software.bytepushers.pick3.converter;

import org.springframework.core.convert.converter.Converter;
import org.springframework.core.convert.converter.ConverterFactory;
import org.springframework.stereotype.Component;
import software.bytepushers.pick3.api.DrawingTime;

import java.util.Arrays;

/**
 * Converts Strings to DrawingTimes based on the (case-insensitive) UserString associated with the drawing time.
 */
@Component
public class StringToDrawingTimeConverterFactory implements ConverterFactory<String, DrawingTime> {

    @Override
    public <T extends DrawingTime> Converter<String, T> getConverter(Class<T> aClass) {
        return new StringToDrawingTimeConverter(aClass);
    }

    private final class StringToDrawingTimeConverter<T extends DrawingTime> implements Converter<String, T> {
        private Class<T> type;

        public StringToDrawingTimeConverter(Class<T> type) {
            this.type = type;
        }

        @Override
        public T convert(String s) {
            return Arrays.stream(type.getEnumConstants())
                    .filter((time) -> time.toUserString().toLowerCase().equals(s))
                    .findFirst()
                    .get();
        }
    }

}
