package software.bytepushers.pick3.dto.enums;

public enum AccountType {

    PREMIUM, BASIC, GUEST;

    public String getRoleName() {
        return "ROLE_" + this.name();
    }

}
