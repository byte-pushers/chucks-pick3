package software.bytepushers.pick3.controllers;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import software.bytepushers.pick3.component.JwtUtils;
import software.bytepushers.pick3.config.security.SecurityConstants;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.ApiError;
import software.bytepushers.pick3.dto.LoginDto;
import software.bytepushers.pick3.dto.LoginResponseDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.enums.AccountType;
import software.bytepushers.pick3.util.ModelUtils;

import javax.servlet.http.Cookie;
import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * The test case implementation to validate the login requests with different scenarios.
 */
public class AuthenticationControllerTest extends AbstractLoginControllerTest {

    @Autowired
    private JwtUtils jwtUtils;

    /**
     * The test case implementation to validate the successful user login req
     * <p>
     * uest with valid token in response.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testSuccessLoginEndpoint() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        User user = ModelUtils.userEntity();
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.of(user));
        Mockito.when(this.userService.getByUsername(loginDto.getUsername())).thenReturn(userDto.getUser());
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User login request must be executed successfully";
        LoginResponseDto loginResponseDto = this.objectMapper.readValue(response.getContentAsString(), LoginResponseDto.class);
        assert StringUtils.isNotBlank(loginResponseDto.getToken()) : "User login response must be return with valid token";
    }

    /**
     * The test case implementation to validate the missing username login request
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testMissingUsernameOnLoginEndpoint() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        loginDto.setUsername(null);
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "User login request must required username";
        ApiError apiError = this.objectMapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "User login request with missing username must return only one validation error";
    }

    /**
     * The test case implementation to validate the missing password login request
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testMissingPasswordOnLoginEndpoint() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        loginDto.setPassword(null);
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "User login request must required password";
        ApiError apiError = this.objectMapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "User login request with missing password must return only one validation error";
    }

    /**
     * The test case implementation to validate the missing login request body
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testMissingRequestBodyOnLoginEndpoint() throws Exception {
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "User login request body must required to login";
    }


    /**
     * The test case implementation to validate the invalid credentials of the user.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testInvalidCredentialLogin() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        User user = ModelUtils.userEntity();
        user.setPassword("incorrect_password");
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.of(user));
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.UNAUTHORIZED.value() : "User must be not authorized with incorrect credential";
    }

    /**
     * The test case implementation to validate the invalid credentials of the user.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testUserNotFoundLogin() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.empty());
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.UNAUTHORIZED.value() : "User must be not authorized with incorrect credential";
    }

    /**
     * The test case implementation to validate the successful user login request with their Http only cookies.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testSuccessLoginCookies() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        User user = ModelUtils.userEntity();
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.of(user));
        Mockito.when(this.userService.getByUsername(loginDto.getUsername())).thenReturn(userDto.getUser());
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User login request must be executed successfully";
        Cookie jwtTokenCookie = response.getCookie(SecurityConstants.JWT_TOKEN_COOKIE_NAME);
        assert jwtTokenCookie != null && StringUtils.isNotBlank(jwtTokenCookie.getValue()) : "User login token must present in cookie.";
        assert jwtTokenCookie.isHttpOnly() : "Cookie must be http only cookie";
    }

    /**
     * The test case implementation to validate the invalid credentials of the user must not include the token cookie.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testInvalidCredentialLoginCookies() throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        User user = ModelUtils.userEntity();
        user.setPassword("incorrect_password");
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.of(user));
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.UNAUTHORIZED.value() : "User must be not authorized with incorrect credential";
        Cookie jwtTokenCookie = response.getCookie(SecurityConstants.JWT_TOKEN_COOKIE_NAME);
        assert jwtTokenCookie == null : "Unauthorized user must not get any security generated cookies in response";
    }

    /**
     * The test case implementation to validate the logout endpoint.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testUnauthorizedLogoutEndpoint() throws Exception {
        MockHttpServletResponse response = mvc.perform(post(LOGOUT_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.FORBIDDEN.value() : "User must required logged in first to do logout";
    }

    /**
     * The test case implementation to validate the logout endpoint.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testSuccessLogoutEndpoint() throws Exception {
        MockHttpServletResponse response = mvc.perform(post(LOGOUT_END_POINT)
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User logout request must be executed successfully if user is authorized.";
        Cookie jwtTokenCookie = response.getCookie(JWT_TOKEN_COOKIE_NAME);
        assert jwtTokenCookie != null && jwtTokenCookie.getMaxAge() == 0 : "Jwt Token cookie must be expired";
    }

    /**
     * The method implementation is responsible for validating the security
     * by hitting secured endpoint with supplying the invalid roles.
     *
     * @throws Exception if something went wrong on request mapping.
     */
    @Test
    public void testUpdateUserEndpointForMissingAccess() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        User user = ModelUtils.userEntity();
        userDto.getUser().setId(5L);
        userDto.getUser().setRoles(Collections.singletonList(AccountType.BASIC.getRoleName() + "_INVALID"));
        user.getRoles().forEach(role -> role.setName(role.getName() + "_INVALID"));
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse loginResponse = loginResponse(user, userDto.getUser());
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(loginResponse.getCookie(JWT_TOKEN_COOKIE_NAME))
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.FORBIDDEN.value() : "User must be throw as access denied error" +
                " if valid roles are not found";
    }

    /**
     * The test case implementation is responsible for validating the security scenario when user roles are not assigned.
     *
     * @throws Exception if something went wrong on request mapping.
     */
    @Test
    public void testUpdateUserEndpointForMissingRoles() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        User user = ModelUtils.userEntity();
        userDto.getUser().setId(5L);
        userDto.getUser().setRoles(Collections.emptyList());
        user.setRoles(Collections.emptySet());
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse loginResponse = loginResponse(user, userDto.getUser());
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(loginResponse.getCookie(JWT_TOKEN_COOKIE_NAME))
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.UNAUTHORIZED.value() : "User must be throw as unauthorized error" +
                " if none of the roles are assigned to the login user";
    }

    /**
     * The test case implementation is responsible the refresh logic implementation while existing token get expired.
     *
     * @throws Exception if somethign went wrong on request mapping.
     */
    @Test
    public void testRefreshTokenForAuthenticatedEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        String expiredJwtToken = this.jwtUtils.generateJwtToken(userDto.getUser().getUsername(),
                userDto.getUser().getRoles(), 0);
        Cookie expiredTokenCookie = new Cookie(JWT_TOKEN_COOKIE_NAME, expiredJwtToken);
        MockHttpServletResponse response = mvc.perform(post(LOGOUT_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(expiredTokenCookie)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be allow to continue the access" +
                " web application if token get refreshed after expired.";
    }

    /**
     * The test case implementation is responsible the refresh logic implementation while refresh token window period passed out.
     *
     * @throws Exception if somethign went wrong on request mapping.
     */
    @Test
    public void testExpiredTokenForIdealUser() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        String expiredJwtToken = this.jwtUtils.generateJwtToken(userDto.getUser().getUsername(),
                userDto.getUser().getRoles(), -600000);
        Cookie expiredTokenCookie = new Cookie(JWT_TOKEN_COOKIE_NAME, expiredJwtToken);
        MockHttpServletResponse response = mvc.perform(put(LOGOUT_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(expiredTokenCookie)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.UNAUTHORIZED.value() : "User must be not allow to access the web application" +
                " if token get expired and out of refresh window period.";
    }
}