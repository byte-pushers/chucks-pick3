package software.bytepushers.pick3.exceptions;

import java.util.Arrays;
import java.util.List;

/**
 * Custom application message exception.
 */
public class ApplicationMessageException extends RuntimeException {

    String[] messages;

    public List<String> getMessages() {
        return Arrays.asList(messages);
    }

    public ApplicationMessageException(String... messages) {
        super(messages != null && messages.length != 0 ? messages[0] : null);
        this.messages = messages;
    }
}
