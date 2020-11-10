package software.bytepushers.pick3.config;

import org.junit.Test;
import software.bytepushers.pick3.ChucksPick3Application;

/**
 * The test case implementation is validating the spring boot startup context.
 */
public class SpringBootContextTest {

    @Test
    public void applicationStarts() {
        ChucksPick3Application.main(new String[]{});
    }

}
