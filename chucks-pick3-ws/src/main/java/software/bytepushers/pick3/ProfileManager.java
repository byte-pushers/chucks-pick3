package software.bytepushers.pick3;

import org.springframework.beans.factory.annotation.Value;

public class ProfileManager {
    @Value("${spring.profiles.active:}")
    private String activeProfiles;

    public void getActiveProfiles() {
        if (activeProfiles != null) {
            for (String profileName : activeProfiles.split(",")) {
                System.out.println("Currently active profile - " + profileName);
            }
        } else {
            System.out.println("Currently NO active profiles.");
        }
    }
}
