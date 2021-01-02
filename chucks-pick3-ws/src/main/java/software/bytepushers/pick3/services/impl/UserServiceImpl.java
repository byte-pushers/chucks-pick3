package software.bytepushers.pick3.services.impl;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.bytepushers.pick3.component.ApplicationUtils;
import software.bytepushers.pick3.domain.AccountType;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDetailsDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.exceptions.MalformedRequestException;
import software.bytepushers.pick3.repositories.AccountRepository;
import software.bytepushers.pick3.repositories.RoleRepository;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.services.UserService;

import java.util.Collections;
import java.util.Optional;

import static software.bytepushers.pick3.dto.UserDetailsDto.fromEntity;

/**
 * Service layer implementation for the user operations.
 */
@Log4j2
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private AccountRepository accountRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public UserDetailsDto getById(Long id) {
        log.debug("Fetch User. Id: {}", id);
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isEmpty()) {
            log.debug("User not found. Id: {}", id);
            throw new MalformedRequestException("User Not Found");
        }
        return fromEntity(userOptional.get());
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public UserDetailsDto getByUsername(String username) {
        log.debug("Fetch User. Id: {}", username);
        Optional<User> userOptional = this.userRepository.findByUsername(username);
        if (userOptional.isEmpty()) {
            log.debug("User not found. Id: {}", username);
            throw new MalformedRequestException("User Not Found");
        }
        User user = userOptional.get();
        return fromEntity(user);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public UserDetailsDto save(UserDto userDto) {
        UserDetailsDto userDetailsDto = userDto.getUser();
        User user = new User();
        ApplicationUtils.copyProperties(userDetailsDto, user);
        String username = userDetailsDto.getUsername();
        log.debug("Create User. Username: {}", username);
        user.setPassword(this.passwordEncoder.encode(user.getPassword()));
        setAccountTypeAndRole(userDto.getType(), user);
        User createdUser = this.userRepository.save(user);
        log.debug("User created. Username: {}", username);
        return fromEntity(createdUser);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public UserDetailsDto update(UserDto userDto) {
        UserDetailsDto userDetailsDto = userDto.getUser();
        Long userId = userDetailsDto.getId();
        String username = userDetailsDto.getUsername();
        log.debug("Update User. id/username: {}/{}", userId, username);
        Optional<User> userOptional = Optional.empty();
        if (userId != null) {
            userOptional = this.userRepository.findById(userId);
        } else if (StringUtils.isNotBlank(username)) {
            userOptional = this.userRepository.findByUsername(username);
        }
        if (userOptional.isEmpty()) {
            log.debug("User not found. id/username: {}/{}", userId, username);
            throw new MalformedRequestException("User not found");
        }
        //Not overriding the password during save/update operation
        User user = userOptional.get();
        ApplicationUtils.copyProperties(userDto.getUser(), user, "id", "username", "password", "roles");
        setAccountTypeAndRole(userDto.getType(), user);
        User updatedUser = this.userRepository.save(user);
        return fromEntity(updatedUser);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    @Transactional
    public void delete(Long id) {
        log.debug("Delete User. Id: {}", id);
        UserDetailsDto userById = getById(id);
        this.userRepository.deleteById(userById.getId());
    }

    /**
     * The method implementation is responsible for setting up the account type and roles.
     *
     * @param account type to set
     * @param user    for whom to set account type and role.
     */
    private void setAccountTypeAndRole(software.bytepushers.pick3.dto.enums.AccountType account, User user) {
        Optional.ofNullable(account).ifPresent(accountType -> {
            Optional<AccountType> accountOptional = this.accountRepository.findByName(accountType.name());
            if (accountOptional.isPresent()) {
                this.roleRepository.findByNameLike(accountType.getRoleName())
                        .ifPresent(role -> user.setRoles(Collections.singleton(role)));
                user.setAccountType(accountOptional.get());
            }
        });
    }

}
