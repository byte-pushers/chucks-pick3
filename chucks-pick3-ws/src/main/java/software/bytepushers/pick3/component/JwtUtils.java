package software.bytepushers.pick3.component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import software.bytepushers.pick3.config.security.ApplicationUser;

import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.JWT_ROLE_JOIN_DELIMITER;
import static software.bytepushers.pick3.config.security.SecurityConstants.TOKEN_EXPIRY_TIME;

@Component
public class JwtUtils {

    @Value("${application.security.token}")
    private String secret;

    public String generateJwtToken(String username, List<String> roles) {
        Date expiration = new Date(System.currentTimeMillis() + TOKEN_EXPIRY_TIME);
        return Jwts.builder().setSubject(username)
                .setIssuer(String.join(JWT_ROLE_JOIN_DELIMITER, roles))
                .setIssuedAt(new Date())
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


}
