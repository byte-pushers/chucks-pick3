package software.bytepushers.pick3.config.security.filter;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import software.bytepushers.pick3.component.JwtUtils;
import software.bytepushers.pick3.config.security.ApplicationUser;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * Authorization filter for next upcoming authenticated user request
 */
@Log4j2
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

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
        String header = request.getHeader(HEADER_STRING);
        if (StringUtils.startsWithIgnoreCase(header, TOKEN_PREFIX)) {
            String token = StringUtils.substringAfter(header, TOKEN_PREFIX);
            UsernamePasswordAuthenticationToken authentication = getAuthentication(token, request);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("Request authenticated.");
        }
        chain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(String jwtToken, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken token = null;
        try {
            ApplicationUser applicationUser = this.jwtUtils.parseToken(jwtToken);
            token = new UsernamePasswordAuthenticationToken(applicationUser.getUsername(), null, applicationUser.getAuthorities());
        } catch (Exception e) {
            log.error("Error. Token invalid: {}", e.getMessage(), e);
            request.setAttribute(TOKEN_ERROR_ATTRIBUTE_KEY, e.getMessage());
        }
        return token;
    }
}
