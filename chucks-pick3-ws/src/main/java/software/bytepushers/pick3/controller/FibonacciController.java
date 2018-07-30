package software.bytepushers.pick3.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.ws.rs.core.MediaType;
import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@EnableWebMvc
public class FibonacciController {

    // Keeping them static here ensures that previously computed values are re-used unless AWS restarts the server.
    private static final int MAX_N = 2222;

    @RequestMapping(path="/fibonacci",
                    method=RequestMethod.GET,
                    produces=MediaType.APPLICATION_JSON)
    public Map<String,String> fibonacci(@RequestParam("n") int n) {
        if (n > MAX_N) {
            return Collections.singletonMap("error", "Cannot specify n larger than " + MAX_N);
        }

        BigInteger[] fibSequence = new BigInteger[3];
        fibSequence[0] = BigInteger.ONE;
        fibSequence[1] = BigInteger.ONE;
        for (int i = 2; i <= n; ++i) {
            fibSequence[i % 3] = fibSequence[(i-1) % 3].add(fibSequence[(i-2) % 3]);
        }

        Map<String, String> result = new HashMap<>();
        result.put("n",         String.valueOf(n));
        result.put("fibonacci", fibSequence[n % 3].toString());
        return result;
    }
}
