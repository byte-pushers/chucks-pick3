package software.bytepushers.pick3.services.impl;

import com.amazonaws.util.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import software.bytepushers.pick3.controllers.exceptions.MalformedRequestException;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDTO;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.services.UserService;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final static Logger LOGGER = LogManager.getLogger();

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * {@inheritDoc}
     *
     * @return
     */
    @Override
    @Transactional
    public UserDTO getById(Long id) {
        LOGGER.debug("Fetch User. Id: {}", id);
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isEmpty()) {
            LOGGER.debug("User not found. Id: {}", id);
            throw new MalformedRequestException("User Not Found");
        }
        UserDTO userdto = new UserDTO();
        BeanUtils.copyProperties(userOptional.get(), userdto);
        return userdto;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void save(UserDTO userDto) {
        String username = userDto.getUsername();
        LOGGER.debug("Create User. Username: {}", username);
        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        this.userRepository.save(user);
        LOGGER.debug("User created. Username: {}", username);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void update(UserDTO userDto) {
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
        BeanUtils.copyProperties(userDto, user, "id", "username", "password");
        this.userRepository.save(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void delete(Long id) {
        LOGGER.debug("Delete User. Id: {}", id);
        UserDTO userById = getById(id);
        this.userRepository.deleteById(userById.getId());
    }


}
