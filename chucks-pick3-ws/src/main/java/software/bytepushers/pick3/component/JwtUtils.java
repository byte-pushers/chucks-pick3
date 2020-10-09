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

@Component
public class JwtUtils {

    @Value("${application.security.token}")
    private String secret;

    public String generateJwtToken(String username, List<String> roles) {
        Date expiration = new Date(System.currentTimeMillis() + 1000 * 60);
        return Jwts.builder().setSubject(username)
                .setIssuer(String.join(JWT_ROLE_JOIN_DELIMITER, roles))
                .setExpiration(expiration)
                .signWith(Keys.hmacShaKeyFor(this.secret.getBytes())).compact();
    }

    public ApplicationUser parseToken(String jwtToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(StringUtils.getBytes(this.secret, StandardCharsets.UTF_8))
                .build().parseClaimsJws(jwtToken).getBody();
        String username = claims.getSubject();
        List<String> roles = Arrays.stream(claims.getIssuer().split(JWT_ROLE_JOIN_DELIMITER)).collect(Collectors.toList());
        return new ApplicationUser(username, null, roles);
    }

    public List<String> getRoles(Claims claims) {
        return Arrays.stream(claims.getIssuer().split(JWT_ROLE_JOIN_DELIMITER)).collect(Collectors.toList());
    }

    public void sendTokenInCookie(String token, HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        Cookie tokenCookie;
        if (cookies != null) {
            Optional<Cookie> jwtTokenCookie = Arrays.stream(cookies).filter(cookie ->
                    StringUtils.equals(cookie.getName(), JWT_TOKEN_COOKIE_NAME)).findAny();
            if (jwtTokenCookie.isPresent()) {
                tokenCookie = jwtTokenCookie.get();
                tokenCookie.setMaxAge(0);
            }
        }
        generateNewCookie(token, response);
    }

    private void generateNewCookie(String token, HttpServletResponse response) {
        Cookie cookie = new Cookie(JWT_TOKEN_COOKIE_NAME, token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(SecurityConstants.TOKEN_EXPIRY_TIME);
        response.addCookie(cookie);
    }

}
