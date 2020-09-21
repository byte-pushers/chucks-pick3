package software.bytepushers.pick3.exceptions;

/**
 * The custom runtime exception to support multiple messages
 */
public class MalformedRequestException extends ApplicationMessageException {
    public MalformedRequestException(String... msgs) {
        super(msgs);
    }
}
