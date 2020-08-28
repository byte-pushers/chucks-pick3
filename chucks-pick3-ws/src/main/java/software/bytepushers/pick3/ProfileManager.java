package software.bytepushers.pick3;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

public class ProfileManager {

    private final static Logger LOGGER = LoggerFactory.getLogger(ProfileManager.class);

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    public void getActiveProfiles() {
        LOGGER.info("ProfileManager.getActiveProfiles() method - start");
        if (activeProfiles != null) {
            for (String profileName : activeProfiles.split(",")) {
                LOGGER.info("Currently active profile - {}", profileName);
            }
        } else {
            LOGGER.info("Currently NO active profiles.");
        }
        LOGGER.info("ProfileManager.getActiveProfiles() method - end");
    }
}
