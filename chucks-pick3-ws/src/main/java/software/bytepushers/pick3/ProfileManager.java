package software.bytepushers.pick3;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;

@Log4j2
public class ProfileManager {

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    public void getActiveProfiles() {
        log.info("ProfileManager.getActiveProfiles() method - start");
        if (activeProfiles != null) {
            for (String profileName : activeProfiles.split(",")) {
                log.info("Currently active profile - {}", profileName);
            }
        } else {
            log.info("Currently NO active profiles.");
        }
        log.info("ProfileManager.getActiveProfiles() method - end");
    }
}
