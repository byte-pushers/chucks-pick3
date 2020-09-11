package software.bytepushers.pick3.config.security.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * Authorization filter for next upcoming authenticated user request
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final static Logger LOGGER = LogManager.getLogger();

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String header = request.getHeader(HEADER_STRING);
        if (StringUtils.startsWithIgnoreCase(header, TOKEN_PREFIX)) {
            String token = StringUtils.substringAfter(header, TOKEN_PREFIX);
            UsernamePasswordAuthenticationToken authentication = getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            LOGGER.info("Request authenticated.");
        }
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(StringUtils.getBytes(SECRET_KEY, StandardCharsets.UTF_8))
                .build().parseClaimsJws(jwtToken).getBody();
        String username = claims.getSubject();
        List<SimpleGrantedAuthority> roles = Arrays.stream(claims.getIssuer().split(JWT_ROLE_JOIN_DELIMITER))
                .map(SimpleGrantedAuthority::new).collect(Collectors.toList());
        return new UsernamePasswordAuthenticationToken(username, null, roles);
    }
}
