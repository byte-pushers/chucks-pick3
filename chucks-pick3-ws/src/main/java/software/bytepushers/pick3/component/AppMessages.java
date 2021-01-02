package software.bytepushers.pick3.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

/**
 * Custom message bundle to load messages from the Messgae source
 */
@Component
public class AppMessages {

    @Autowired
    private MessageSource messageSource;

    /**
     * This method is responsible for providing message based on message property file.
     *
     * @param messageCode to fetch the readable message from property file.
     * @return the message.
     */
    public String getMessage(String messageCode) {
        return this.messageSource.getMessage(messageCode, null, Locale.ENGLISH);
    }
}
