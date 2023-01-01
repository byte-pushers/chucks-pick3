package software.bytepushers.pick3.controllers;

import org.apache.commons.lang3.StringUtils;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.junit4.SpringRunner;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.LoginDto;
import software.bytepushers.pick3.dto.LoginResponseDto;
import software.bytepushers.pick3.dto.UserDetailsDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.enums.AccountType;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.services.UserService;
import software.bytepushers.pick3.util.ModelUtils;

import java.util.Collections;
import java.util.Optional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static software.bytepushers.pick3.config.security.SecurityConstants.LOGIN_END_POINT;

@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class AbstractLoginControllerTest extends AbstractControllerTest {

    @MockBean
    protected UserRepository userRepository;

    @MockBean
    protected UserService userService;

    protected static String JWT_TOKEN;

    protected static MockHttpServletResponse LOGIN_RESPONSE;

    @Before
    public void before() throws Exception {
        super.before();
        if (StringUtils.isBlank(JWT_TOKEN)) {
            User user = ModelUtils.userEntity();
            UserDto userDto = ModelUtils.userDto();
            userDto.getUser().setRoles(Collections.singletonList(AccountType.PREMIUM.name()));
            LOGIN_RESPONSE = loginResponse(user, userDto.getUser());
            LoginResponseDto loginResponseDto = this.objectMapper.readValue(LOGIN_RESPONSE.getContentAsString(), LoginResponseDto.class);
            JWT_TOKEN = loginResponseDto.getToken();
        }
    }

    /**
     * The method implementation is responsible for generating the login response.
     *
     * @return the login response.
     * @throws Exception if something went wrong.
     */
    protected MockHttpServletResponse loginResponse(User user, UserDetailsDto userDto) throws Exception {
        LoginDto loginDto = ModelUtils.loginDto();
        Mockito.when(this.userRepository.findByUsername(loginDto.getUsername())).thenReturn(Optional.of(user));
        Mockito.when(this.userService.getByUsername(loginDto.getUsername())).thenReturn(userDto);
        //Below line won't include the password as it is marked as only writable field.
        String requestBodyInJson = this.objectMapper.writeValueAsString(loginDto);
        MockHttpServletResponse response = mvc.perform(post(LOGIN_END_POINT).contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyInJson)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "User login request must be executed successfully";
        return response;
    }

}
