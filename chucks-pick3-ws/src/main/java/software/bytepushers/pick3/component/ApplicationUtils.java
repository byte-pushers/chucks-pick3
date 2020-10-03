package software.bytepushers.pick3.component;

import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;

import java.beans.FeatureDescriptor;
import java.util.stream.Stream;

/**
 * Utility methods of the application
 */
public class ApplicationUtils {

    public static void copyProperties(Object source, Object destination, String... ignoreProperties) {
        String[] nullFieldNames = getNullFieldNames(source);
        BeanUtils.copyProperties(source, destination, ArrayUtils.addAll(nullFieldNames, ignoreProperties));
    }

    private static String[] getNullFieldNames(Object source) {
        BeanWrapper bean = new BeanWrapperImpl(source);
        return Stream.of(bean.getPropertyDescriptors()).map(FeatureDescriptor::getName)
                .filter(property -> bean.getPropertyValue(property) == null).toArray(String[]::new);
    }

    private ApplicationUtils(){
    }

}
