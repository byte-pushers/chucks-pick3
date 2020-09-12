package software.bytepushers.pick3.controllers.exceptions;

import java.util.Arrays;
import java.util.List;

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
