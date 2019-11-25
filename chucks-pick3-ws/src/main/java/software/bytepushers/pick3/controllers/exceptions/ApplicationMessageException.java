package software.bytepushers.pick3.controllers.exceptions;

import java.util.Arrays;
import java.util.List;

public class ApplicationMessageException extends Exception {

    String[] messages;

    public List<String> getMessages() {
        return Arrays.asList(messages);
    }

    public ApplicationMessageException(String... messages) {
        super(messages.length == 0 ? null : messages[0]);
        this.messages = messages;
    }
}
