package software.bytepushers.pick3.controllers.exceptions;

public class MalformedRequestException extends ApplicationMessageException {
    public MalformedRequestException(String... msgs) { super(msgs); }
}
