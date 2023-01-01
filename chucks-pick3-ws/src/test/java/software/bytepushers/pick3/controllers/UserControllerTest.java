package software.bytepushers.pick3.controllers;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hibernate.validator.internal.engine.ConstraintViolationImpl;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import software.bytepushers.pick3.config.security.SecurityConstants;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.ApiError;
import software.bytepushers.pick3.dto.UserDetailsDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.exceptions.MalformedRequestException;
import software.bytepushers.pick3.util.ModelUtils;

import javax.servlet.http.Cookie;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.Collections;
import java.util.Optional;

import static java.util.Collections.emptyMap;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * The test cases for the user controller.
 */
public class UserControllerTest extends AbstractLoginControllerTest {

    /**
     * The test case implementation to validate the create user endpoint.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testCreateUserEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userRepository.findByUsername(userDto.getUser().getUsername())).thenReturn(Optional.empty());
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Password is mandatory fields";
        ApiError apiError = this.objectMapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "Password is mandatory field while user is getting created";
    }

    @Test
    public void testCreateUserEndpointIfPasswordNotProvided() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testCreateUserEndpointIfUserDetailsNotProvided() throws Exception {
        mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().is4xxClientError());
    }

    @Test
    public void testSuccessCreateUserEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userRepository.findByUsername(userDto.getUser().getUsername())).thenReturn(Optional.empty());
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(MapperFeature.USE_ANNOTATIONS);
        String requestBodyInJson = mapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be created successfulyl if all parameters are supplied";
    }

    @Test
    public void testCreateUserEndpointIfNamesNotProvided() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        userDto.getUser().setFirstName(null);
        userDto.getUser().setLastName(null);
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Firstname, Lastname & Password is mandatory fields";
        ApiError apiError = this.objectMapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 3 : "3 errors must found in response";
    }

    @Test
    public void testCreateUserEndpointIfUsernameExist() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        User userEntity = ModelUtils.userEntity();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(MapperFeature.USE_ANNOTATIONS);
        String requestBodyInJson = mapper.writeValueAsString(userDto);
        Mockito.when(this.userRepository.findByUsername(userDto.getUser().getUsername()))
                .thenReturn(Optional.of(userEntity));
        MockHttpServletResponse response = mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Request must be return as Bad Request because username is already exists";
        ApiError apiError = mapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "Only username exist error should found";
    }

    @Test
    public void testCreateUserEndpointIfUserEmailExist() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        User userEntity = ModelUtils.userEntity();
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(MapperFeature.USE_ANNOTATIONS);
        String requestBodyInJson = mapper.writeValueAsString(userDto);
        Mockito.when(this.userRepository.findByEmail(userDto.getUser().getEmail())).thenReturn(Optional.of(userEntity));
        MockHttpServletResponse response = mvc.perform(post(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Request must be return as Bad Request because email is already exists";
        ApiError apiError = mapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "Only email exist error should found";
    }

    @Test
    public void testUpdateUserEndpointIdNotProvided() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Id must required to update the user.";
        ApiError apiError = this.objectMapper.readValue(response.getContentAsString(), ApiError.class);
        assert apiError.getErrors().size() == 1 : "Only one error should trigger for missing id";
    }

    @Test
    public void testUpdateUserEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        userDto.getUser().setId(5L);
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be updated successfully.";
    }

    @Test
    public void testUserByIdEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User get by id endpoint must return user details successfully.";
        UserDetailsDto createdUser = this.objectMapper.readValue(response.getContentAsString(), UserDetailsDto.class);
        assert createdUser.getFirstName().equals(userDto.getUser().getFirstName()) : "Created user details must be same as provided in request.";
    }

    @Test
    public void testUserByIdEndpointWithInvalidId() throws Exception {
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .content("Content")).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Invlid request body should throw as Bad Request.";
    }


    @Test
    public void testUserByIdEndpointWhenNotFound() throws Exception {
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenThrow(new MalformedRequestException());
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Missing User must be thrown as bad request";
    }

    @Test
    public void testUserByIdEndpointMissingId() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.METHOD_NOT_ALLOWED.value() : "User get by id endpoint must required user id to fetch details.";
    }

    @Test
    public void testUserByIdEndpointWithDatabaseConstraintsError() throws Exception {
        ConstraintViolation<Object> messagee = ConstraintViolationImpl.forBeanValidation("message.template", emptyMap(), emptyMap(),
                "Invalid query", Object.class, null, null, null, null, null, null, null);
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenThrow(new ConstraintViolationException(Collections.singleton(messagee)));
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Database constraints error must be thrown as Bad Request.";
    }

    @Test
    public void testUserDeleteByIdEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be deleted successfully by id.";
    }

    @Test
    public void testUserDeleteByIdEndpointMissingId() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.METHOD_NOT_ALLOWED.value() : "Delete User endpoint must required user id.";
    }

    @Test
    public void testUserDeleteByIdEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Cookie cookie = new Cookie(JWT_TOKEN_COOKIE_NAME, JWT_TOKEN);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(SecurityConstants.TOKEN_EXPIRY_TIME);
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT + "/5")
                .cookie(cookie)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();

        assert response.getStatus() == HttpStatus.OK.value() : "User must be deleted successfully by id if jwt cookie is valid and present. status: " + response.getStatus() + " content:" + response.getContentAsString();
    }

    @Test
    public void testUserByIdEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto.getUser());
        System.out.println("cookie: " + LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME).getName());
        System.out.println("cookie: " + LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME).getValue());
        System.out.println("cookie: " + LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME).getMaxAge());
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User get by id endpoint must return user" +
                " details successfully if jwt cookie is valid and present. status: " + response.getStatus() + " content:" + response.getContentAsString();
    }

    @Test
    public void testUpdateUserEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        userDto.getUser().setId(5L);
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be updated successfully" +
                " if jwt cookie is valid and present. status: " + response.getStatus() + " content:" + response.getContentAsString();
    }
}