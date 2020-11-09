package software.bytepushers.pick3.dto.enums;

/**
 * Account type enum.
 */
public enum AccountType {

    PREMIUM, BASIC, GUEST;

    public String getRoleName() {
        return "ROLE_" + this.name();
    }

}
