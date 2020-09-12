package software.bytepushers.pick3.config.security.filter;

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
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

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
        ApplicationUser applicationUser = this.jwtUtils.parseToken(jwtToken);
        return new UsernamePasswordAuthenticationToken(applicationUser.getUsername(), null, applicationUser.getAuthorities());
    }
}
