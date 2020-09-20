package software.bytepushers.pick3;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@Log4j2
@EnableCaching
@SpringBootApplication
public class ChucksPick3Application {

    public static void main(String[] args) {
        log.info("Inside ChucksPick3Application.main() method.");
        SpringApplication.run(ChucksPick3Application.class, args);
        log.info("Inside ChucksPick3Application.main() method - Done initializing app.");
        ProfileManager pm = new ProfileManager();
        pm.getActiveProfiles();
    }

}
