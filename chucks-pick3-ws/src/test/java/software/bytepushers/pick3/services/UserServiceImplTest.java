package software.bytepushers.pick3.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.exceptions.MalformedRequestException;
import software.bytepushers.pick3.repositories.AccountRepository;
import software.bytepushers.pick3.repositories.RoleRepository;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.services.impl.UserServiceImpl;
import software.bytepushers.pick3.util.ModelUtils;

import java.util.Optional;

/**
 * User service layer test case implementations
 */
@ExtendWith(MockitoExtension.class)
public class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private AccountRepository accountRepository;

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Before
    public void before() {
        MockitoAnnotations.initMocks(this);
    }

    /**
     * The test case implementation to validate the save operation if all details are supplied..
     */
    @Test
    public void testUserSave() {
        UserDto userDto = ModelUtils.userDto();
        this.userServiceImpl.save(userDto);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testUserSaveWithNull() {
        this.userServiceImpl.save(null);
    }

    @Test
    public void testUserUpdateUsingUsername() {
        UserDto userDto = ModelUtils.userDto();
        User userEntity = ModelUtils.userEntity();
        Mockito.when(this.userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.of(userEntity));
        this.userServiceImpl.update(userDto);
    }

    @Test(expected = MalformedRequestException.class)
    public void testUserUpdateIfUserNotFoundUsingUsername() {
        UserDto userDto = ModelUtils.userDto();
        User userEntity = ModelUtils.userEntity();
        Mockito.when(this.userRepository.findByUsername(Mockito.anyString())).thenReturn(Optional.empty());
        this.userServiceImpl.update(userDto);
    }

    @Test
    public void testUserUpdateUsingUserId() {
        UserDto userDto = ModelUtils.userDto();
        User userEntity = ModelUtils.userEntity();
        userDto.setId(1L);
        Mockito.when(this.userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(userEntity));
        this.userServiceImpl.update(userDto);
    }

    @Test(expected = MalformedRequestException.class)
    public void testUserUpdateIfUserNotFoundUsingUserId() {
        UserDto userDto = ModelUtils.userDto();
        userDto.setId(1L);
        Mockito.when(this.userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        this.userServiceImpl.update(userDto);
    }

    @Test
    public void testUserDelete() {
        User userEntity = ModelUtils.userEntity();
        Mockito.when(this.userRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(userEntity));
        this.userServiceImpl.delete(1L);
    }

    @Test(expected = MalformedRequestException.class)
    public void testUserDeleteIfNotFound() {
        User userEntity = ModelUtils.userEntity();
        Mockito.when(this.userRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        this.userServiceImpl.delete(1L);
    }
}
