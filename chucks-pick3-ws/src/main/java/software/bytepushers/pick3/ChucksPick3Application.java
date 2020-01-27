package software.bytepushers.pick3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
public class ChucksPick3Application {
    public static void main(String[] args) {
        System.out.println("Inside ChucksPick3Application.main() method.");
        SpringApplication.run(ChucksPick3Application.class, args);
        System.out.println("Inside ChucksPick3Application.main() method - Done initializing app.");
        ProfileManager pm = new ProfileManager();
        pm.getActiveProfiles();
    }
}
