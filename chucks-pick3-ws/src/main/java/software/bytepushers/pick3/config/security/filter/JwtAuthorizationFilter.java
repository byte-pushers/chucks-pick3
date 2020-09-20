package software.bytepushers.pick3.config.security.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import software.bytepushers.pick3.component.JwtUtils;
import software.bytepushers.pick3.config.security.ApplicationUser;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * Authorization filter for next upcoming authenticated user request
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final static Logger LOGGER = LogManager.getLogger();

    private final JwtUtils jwtUtils;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        super(authenticationManager);
        this.jwtUtils = jwtUtils;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        String jwtToken = readJwtToken(request);
        if (StringUtils.isNotBlank(jwtToken)) {
            UsernamePasswordAuthenticationToken authentication = getAuthentication(jwtToken, request, response);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            LOGGER.info("Request authenticated.");
        }
        chain.doFilter(request, response);
    }

    private String readJwtToken(HttpServletRequest request) {
        AtomicReference<String> jwtToken = new AtomicReference<>();
        String header = request.getHeader(HEADER_STRING);
        Cookie[] cookies = request.getCookies();
        if (StringUtils.startsWithIgnoreCase(header, TOKEN_PREFIX)) {
            jwtToken.set(StringUtils.substringAfter(header, TOKEN_PREFIX));
        } else if (cookies != null) {
            Arrays.stream(cookies).filter(cookie -> StringUtils.equals(cookie.getName(), JWT_TOKEN_COOKIE_NAME))
                    .findAny().ifPresent(cookie -> jwtToken.set(cookie.getValue()));
        }
        return jwtToken.get();
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken, HttpServletRequest request, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken token = null;
        try {
            ApplicationUser applicationUser = this.jwtUtils.parseToken(jwtToken);
            token = new UsernamePasswordAuthenticationToken(applicationUser.getUsername(), null, applicationUser.getAuthorities());
        } catch (ExpiredJwtException e) {
            LOGGER.error("Error. Token expired: {}", e.getMessage());
            try {
                Claims expiredJwtTokenClaims = e.getClaims();
                LocalDateTime tokenExpiredAt = expiredJwtTokenClaims.getExpiration().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
                long refreshTokenWindow = Duration.between(tokenExpiredAt, LocalDateTime.now()).toSeconds();
                LOGGER.info("Refresh Token Window(in minutes): {}", refreshTokenWindow);
                if (TOKEN_REFRESH_WINDOW_IN_MINUTES > refreshTokenWindow) {
                    LOGGER.info("Lucky User. Refreshing token before it getting expired.");
                    String username = expiredJwtTokenClaims.getSubject();
                    List<String> roles = this.jwtUtils.getRoles(expiredJwtTokenClaims);
                    String refreshedToken = this.jwtUtils.generateJwtToken(username, roles);
                    this.jwtUtils.sendTokenInCookie(refreshedToken, request, response);

                    ApplicationUser refreshedUser = this.jwtUtils.parseToken(refreshedToken);
                    token = new UsernamePasswordAuthenticationToken(refreshedUser.getUsername(),
                            null, refreshedUser.getAuthorities());
                } else {
                    request.setAttribute(TOKEN_ERROR_ATTRIBUTE_KEY, "Token expired.");
                }
            } catch (Exception error) {
                request.setAttribute(TOKEN_ERROR_ATTRIBUTE_KEY, "Invalid token.");
                LOGGER.error("Error. During refreshing the token: {}", e.getMessage(), e);
            }
        } catch (Exception e) {
            LOGGER.error("Error. Token invalid: {}", e.getMessage(), e);
            request.setAttribute(TOKEN_ERROR_ATTRIBUTE_KEY, "Invalid token");
        }
        return token;
    }
}
