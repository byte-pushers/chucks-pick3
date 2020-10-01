package software.bytepushers.pick3.component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.bytepushers.pick3.config.security.ApplicationUser;
import software.bytepushers.pick3.config.security.SecurityConstants;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.JWT_ROLE_JOIN_DELIMITER;
import static software.bytepushers.pick3.config.security.SecurityConstants.JWT_TOKEN_COOKIE_NAME;

/**
 * The JWT Token component to work with security integration.
 */
@Component
public class JwtUtils {

    @Value("${application.security.token}")
    private String secret;

    /**
     * The method implementation is responsible for generating the jwt token based on the used details.
     *
     * @param username to add in jwt token.
     * @param roles    to add in jwt token.
     * @return the valid jwt token.
     */
    public String generateJwtToken(String username, List<String> roles) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60);
        return Jwts.builder().setSubject(username)
                .setIssuer(String.join(JWT_ROLE_JOIN_DELIMITER, roles))
                .setExpiration(expiration)
                .signWith(Keys.hmacShaKeyFor(this.secret.getBytes())).compact();
    }

    /**
     * The method implementation is responsible parsing the for jwt token to build the application user.
     *
     * @param jwtToken to parse
     * @return the application user
     */
    public ApplicationUser parseToken(String jwtToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(StringUtils.getBytes(this.secret, StandardCharsets.UTF_8))
                .build().parseClaimsJws(jwtToken).getBody();
        String username = claims.getSubject();
        List<String> roles = Arrays.stream(claims.getIssuer().split(JWT_ROLE_JOIN_DELIMITER)).collect(Collectors.toList());
        return new ApplicationUser(username, null, roles);
    }

    /**
     * The method implementation is responsible for providing the list of roles.
     *
     * @param claims from where read the roles.
     * @return the list of roles.
     */
    public List<String> getRoles(Claims claims) {
        return Arrays.stream(claims.getIssuer().split(JWT_ROLE_JOIN_DELIMITER)).collect(Collectors.toList());
    }

    /**
     * The method implementation is responsible for sending the token in cookie.
     *
     * @param token    to send in cookie
     * @param request  to read cookie
     * @param response to add cookie
     */
    public void sendTokenInCookie(String token, HttpServletRequest request, HttpServletResponse response) {
        cleanJwtTokenCookie(request, response);
        generateNewCookie(token, response, SecurityConstants.TOKEN_EXPIRY_TIME);
    }

    /**
     * The method implementation is responsible for generating the jwt token cookie
     *
     * @param token    to add in cookie value
     * @param response to add cookie
     * @param expire   time of the cookie
     */
    private void generateNewCookie(String token, HttpServletResponse response, int expire) {
        Cookie cookie = new Cookie(JWT_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(expire);
        response.addCookie(cookie);
    }

    /**
     * The method implementation is responsible for cleaning up the jwt token cookie.
     *
     * @param request  to read the existing cookie.
     * @param response to remove the http cookie.
     */
    public void cleanJwtTokenCookie(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            Optional<Cookie> jwtTokenCookie = Arrays.stream(cookies).filter(cookie ->
                    StringUtils.equals(cookie.getName(), JWT_TOKEN_COOKIE_NAME)).findAny();
            if (jwtTokenCookie.isPresent()) {
                Cookie tokenCookie = jwtTokenCookie.get();
                tokenCookie.setMaxAge(0);
                tokenCookie.setValue(null);
            }
        }
        generateNewCookie(null, response, 0);
    }
}