package software.bytepushers.pick3.exceptions;

import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ApplicationMessageExceptionTest {

    @Test
    public void testApplicationMessageFirstMessageSetOnSuperClass() {
        ApplicationMessageException ex = new ApplicationMessageException("first message");

        assertThat(ex.getMessage()).isEqualTo("first message");
    }

    @Test
    public void testApplicationMessagesAreAllAvailable() {
        ApplicationMessageException ex = new ApplicationMessageException("msg1", "msg2", "msg3");

        assertThat(ex.getMessages()).containsExactly("msg1", "msg2", "msg3");
    }

    @Test
    public void testApplicationMessagesNoMessagesYieldsNullMessageAndEmptyMessagesArray() {
        ApplicationMessageException ex = new ApplicationMessageException();

        assertThat(ex.getMessages()).isNullOrEmpty();
        assertThat(ex.getMessage()).isNull();
    }
}
