package software.bytepushers.pick3;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class ChucksPick3Application {

    private final static Logger LOGGER = LogManager.getLogger();

    public static void main(String[] args) {
        LOGGER.info("Inside ChucksPick3Application.main() method.");
        SpringApplication.run(ChucksPick3Application.class, args);
        LOGGER.info("Inside ChucksPick3Application.main() method - Done initializing app.");
        ProfileManager pm = new ProfileManager();
        pm.getActiveProfiles();
    }

}
