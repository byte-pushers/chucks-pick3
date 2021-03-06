package software.bytepushers.pick3;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Value;

/**
 * Profile manager.
 */
@Log4j2
public class ProfileManager {

    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    /**
     * Logging the active profiles.
     */
    public void getActiveProfiles() {
        log.info("ProfileManager.getActiveProfiles() method - start");
        log.info("Active profiles: {}", activeProfiles);
        log.info("ProfileManager.getActiveProfiles() method - end");
    }
}
