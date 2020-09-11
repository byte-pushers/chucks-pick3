package software.bytepushers.pick3.config.security;

public interface SecurityConstants {

    String HEADER_STRING = "Authorization";

    String TOKEN_PREFIX = "Bearer ";

    int TOKEN_EXPIRY_TIME = 60 * 60 * 1000;

    String JWT_ROLE_JOIN_DELIMITER = ",";

    String ROLE_GUEST = "GUEST";

    String ROLE_BASIC = "BASIC";

    String ROLE_PREMIUM = "PREMIUM";

    String LOGIN_END_POINT = "/api/v1/login";

    //TODO: move it to the environment variable
    String SECRET_KEY = "chuckspick3chuckspick3chuckspick3chuckspick3chuckspick3";

}
