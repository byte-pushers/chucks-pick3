package software.bytepushers.pick3.component;

import com.amazonaws.util.StringUtils;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Component;

import java.util.Locale;

/**
 *
 */
@Component
public class AppMessages {

    private final MessageSource messageSource;

    public AppMessages(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    /**
     * This method is responsible for providing message based on message property file.
     *
     * @param messageCode to fetch the readable message from property file.
     * @return the message.
     */
    public String getMessage(String messageCode) {
        String message;
        if (!StringUtils.isNullOrEmpty(messageCode)) {
            message = this.messageSource.getMessage(messageCode, null, Locale.ENGLISH);
        } else {
            message = "Message Not Found";
        }
        return message;
    }
}
