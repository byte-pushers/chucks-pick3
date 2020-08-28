package software.bytepushers.pick3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ChucksPick3Application {

    private final static Logger LOGGER = LoggerFactory.getLogger(ChucksPick3Application.class);

    public static void main(String[] args) {
        LOGGER.info("Inside ChucksPick3Application.main() method.");
        SpringApplication.run(ChucksPick3Application.class, args);
        LOGGER.info("Inside ChucksPick3Application.main() method - Done initializing app.");
        ProfileManager pm = new ProfileManager();
        pm.getActiveProfiles();
    }

}
