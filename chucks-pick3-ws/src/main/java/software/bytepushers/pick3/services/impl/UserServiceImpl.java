package software.bytepushers.pick3.services.impl;

import com.amazonaws.util.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.bytepushers.pick3.controllers.exceptions.MalformedRequestException;
import software.bytepushers.pick3.domain.Role;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.repositories.RoleRepository;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.services.UserService;

import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Service layer implementation for the user operations.
 */
@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = LogManager.getLogger();

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    private final RoleRepository roleRepository;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
    }

    /**
     * {@inheritDoc}
     *
     * @return
     */
    @Override
    @Transactional
    public UserDto getById(Long id) {
        LOGGER.debug("Fetch User. Id: {}", id);
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isEmpty()) {
            LOGGER.debug("User not found. Id: {}", id);
            throw new MalformedRequestException("User Not Found");
        }
        return getUserDto(userOptional.get());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public UserDto getByUsername(String username) {
        LOGGER.debug("Fetch User. Id: {}", username);
        Optional<User> userOptional = this.userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            LOGGER.debug("User not found. Id: {}", username);
            throw new MalformedRequestException("User Not Found");
        }
        User user = userOptional.get();
        return getUserDto(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void save(UserDto userDto) {
        String username = userDto.getUsername();
        LOGGER.debug("Create User. Username: {}", username);
        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        Set<Role> roles = userDto.getRoles().stream().map(role ->
                this.roleRepository.findByName(role).orElse(null)).filter(Objects::nonNull).collect(Collectors.toSet());
        user.setRoles(roles);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.userRepository.save(user);
        LOGGER.debug("User created. Username: {}", username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void update(UserDto userDto) {
        Long userId = userDto.getId();
        String username = userDto.getUsername();
        LOGGER.debug("Update User. id/username: {}/{}", userId, username);
        Optional<User> userOptional = Optional.empty();
        if (userId != null) {
            userOptional = this.userRepository.findById(userId);
        } else if (!StringUtils.isNullOrEmpty(username)) {
            userOptional = this.userRepository.findByUsername(username);
        }
        if (userOptional.isEmpty()) {
            LOGGER.debug("User not found. id/username: {}/{}", userId, username);
            throw new MalformedRequestException("User not found");
        }
        //Not overriding the password during save/update operation
        User user = userOptional.get();
        BeanUtils.copyProperties(userDto, user, "id", "username", "password", "roles");
        Set<Role> roles = userDto.getRoles().stream().map(role ->
                this.roleRepository.findByName(role).orElse(null)).filter(Objects::nonNull).collect(Collectors.toSet());
        user.setRoles(roles);
        this.userRepository.save(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void delete(Long id) {
        LOGGER.debug("Delete User. Id: {}", id);
        UserDto userById = getById(id);
        this.userRepository.deleteById(userById.getId());
    }

    private UserDto getUserDto(User user) {
        UserDto userdto = new UserDto();
        BeanUtils.copyProperties(user, userdto);
        userdto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
        return userdto;
    }


}
