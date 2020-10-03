package software.bytepushers.pick3.controllers;

import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.ApiError;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.util.ModelUtils;

import java.util.Optional;

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
        Mockito.when(this.userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.empty());
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
        Mockito.when(this.userRepository.findByUsername(userDto.getUsername())).thenReturn(Optional.empty());
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
        userDto.setFirstName(null);
        userDto.setLastName(null);
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
        Mockito.when(this.userRepository.findByUsername(userDto.getUsername()))
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
        Mockito.when(this.userRepository.findByEmail(userDto.getEmail())).thenReturn(Optional.of(userEntity));
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
        userDto.setId(5L);
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
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User get by id endpoint must return user details successfully.";
        UserDto createdUser = this.objectMapper.readValue(response.getContentAsString(), UserDto.class);
        assert createdUser.getFirstName().equals(userDto.getFirstName()) : "Created user details must be same as provided in request.";
    }

    @Test
    public void testUserByIdEndpointMissingId() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.METHOD_NOT_ALLOWED.value() : "User get by id endpoint must required user id to fetch details.";
    }

    @Test
    public void testUserDeleteByIdEndpoint() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT + "/5")
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be deleted successfully by id.";
    }

    @Test
    public void testUserDeleteByIdEndpointMissingId() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT)
                .header(HEADER_STRING, TOKEN_PREFIX + JWT_TOKEN)
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.METHOD_NOT_ALLOWED.value() : "Delete User endpoint must required user id.";
    }

    @Test
    public void testUserDeleteByIdEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(delete(USERS_END_POINT + "/5")
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be deleted successfully by id if jwt cookie is valid and present.";
    }

    @Test
    public void testUserByIdEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        Mockito.when(this.userService.getById(Mockito.anyLong())).thenReturn(userDto);
        MockHttpServletResponse response = mvc.perform(get(USERS_END_POINT + "/5")
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User get by id endpoint must return user" +
                " details successfully if jwt cookie is valid and present.";
    }

    @Test
    public void testUpdateUserEndpointByCookie() throws Exception {
        UserDto userDto = ModelUtils.userDto();
        userDto.setId(5L);
        String requestBodyInJson = this.objectMapper.writeValueAsString(userDto);
        MockHttpServletResponse response = mvc.perform(put(USERS_END_POINT)
                .contentType(MediaType.APPLICATION_JSON)
                .cookie(LOGIN_RESPONSE.getCookie(JWT_TOKEN_COOKIE_NAME))
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User must be updated successfully" +
                " if jwt cookie is valid and present.";
    }
}