package software.bytepushers.pick3.config.security.filter;

import org.apache.commons.lang3.StringUtils;
import software.bytepushers.pick3.config.security.MutableHttpServletRequest;
import software.bytepushers.pick3.config.security.SecurityConstants;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.URLDecoder;

import static software.bytepushers.pick3.config.security.SecurityConstants.HEADER_STRING;
import static software.bytepushers.pick3.config.security.SecurityConstants.TOKEN_PREFIX;

public class CheckAuthCookieFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        MutableHttpServletRequest mutableRequest = new MutableHttpServletRequest(httpServletRequest);

        Cookie[] cookies = httpServletRequest.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (SecurityConstants.JWT_TOKEN_COOKIE_NAME.equals(cookie.getName())) {
//                    mutableRequest.putHeader("Authorization", URLDecoder.decode(cookie.getValue(), "utf-8"));
                    mutableRequest.putHeader(HEADER_STRING, StringUtils.join(TOKEN_PREFIX + (cookie.getValue())));
                }
            }
        }
        chain.doFilter(mutableRequest, response);
    }

    @Override
    public void destroy() {

    }


    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }
}
