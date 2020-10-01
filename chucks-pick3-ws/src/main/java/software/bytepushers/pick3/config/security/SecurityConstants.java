package software.bytepushers.pick3.config.security;

public interface SecurityConstants {

    String HEADER_STRING = "Authorization";

    String TOKEN_PREFIX = "Bearer ";

    int TOKEN_EXPIRY_TIME = 60 * 60 * 1000;

    String JWT_ROLE_JOIN_DELIMITER = ",";

    String ROLE_GUEST = "GUEST";

    String ROLE_BASIC = "BASIC";

    String ROLE_PREMIUM = "PREMIUM";

    String ROLE_ADMIN = "ADMIN";

    String LOGIN_END_POINT = "/api/v1/login";

    String LOGOUT_END_POINT = "/api/v1/logout";

    String USERS_END_POINT = "/api/v1/users";

    String ROLES_END_POINT = "/api/v1/roles";

    String ACCOUNT_TYPE_END_POINT = "/api/v1/account-type";

    String TOKEN_ERROR_ATTRIBUTE_KEY = "tokenError";

    int TOKEN_REFRESH_WINDOW_IN_MINUTES = 5 * 60;

    String JWT_TOKEN_COOKIE_NAME = "jwtToken";

    //TODO: move it to the environment variable
    String SECRET_KEY = "chuckspick3chuckspick3chuckspick3chuckspick3chuckspick3";

}
