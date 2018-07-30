package software.bytepushers.pick3.controller;

import org.junit.BeforeClass;
import org.junit.Test;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;

public class FibonacciControllerTest {

    private static FibonacciController controller;

    @BeforeClass
    public static void setUp() {
        controller = new FibonacciController();
    }

    @Test
    public void fibonacciNumberTest() {
        Map<String,String> response = controller.fibonacci(5);

        assertThat(response).containsKeys("n", "fibonacci");
        assertThat(response.get("n")).isEqualTo("5");
        assertThat(response.get("fibonacci")).isEqualTo("8");
    }


}
