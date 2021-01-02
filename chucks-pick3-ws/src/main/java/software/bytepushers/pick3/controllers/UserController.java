package software.bytepushers.pick3.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.dto.UserDetailsDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.UserDto.CreateUserRequest;
import software.bytepushers.pick3.dto.UserDto.UpdateUserRequest;
import software.bytepushers.pick3.services.UserService;

import javax.validation.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.USERS_END_POINT;

/**
 * The rest endpoint implementation for the User operations
 */
@Log4j2
@RestController
@RequestMapping(USERS_END_POINT)
public class UserController {

    @Autowired
    private UserService userServiceImpl;

    /**
     * The rest endpoint is responsible for fetching the user details by id.
     *
     * @param id of the user to fetch details
     * @return the user details
     */
    @GetMapping("/{id}")
    public UserDetailsDto userById(@PathVariable Long id) {
        log.info("Fetch User. Id: {}", id);
        return this.userServiceImpl.getById(id);
    }

    /**
     * The rest endpoint is responsible for creating/adding/saving the user details.
     *
     * @param userDto with required details as a request paylod.
     */
    @PostMapping
    public UserDetailsDto save(@RequestBody @Valid UserDto userDto) {
        List<Object> objectsToValidate = new ArrayList<>();
        objectsToValidate.add(userDto.getUser());
        objectsToValidate.add(userDto);
        validateRequest(objectsToValidate, CreateUserRequest.class);
        UserDetailsDto userDetailsDto = userDto.getUser();
        log.info("Save User. username: {}", userDetailsDto.getUsername());
        return this.userServiceImpl.save(userDto);
    }

    /**
     * The rest endpoint is responsible for updating the user details.
     *
     * @param userDto userDto with required details as a request paylod.
     */
    @PutMapping
    public void update(@RequestBody @Valid UserDto userDto) {
        validateRequest(Collections.singletonList(userDto.getUser()), UpdateUserRequest.class);
        UserDetailsDto userDetailsDto = userDto.getUser();
        log.info("Update User. Id: {}", userDetailsDto.getId());
        this.userServiceImpl.update(userDto);
    }

    /**
     * The rest endpoint is responsible for deleting the user details.
     *
     * @param id of the user to delete.
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        log.info("Delete User. Id: {}", id);
        this.userServiceImpl.delete(id);
    }

    /**
     * The method implementation is responsible for validating the object manually
     *
     * @param objects to validate
     * @param type    to validate the group.
     */
    private void validateRequest(List<Object> objects, Class<?> type) {
        Validator validator = Validation.buildDefaultValidatorFactory().getValidator();
        Set<ConstraintViolation<Object>> violations = objects.stream().map(object -> validator.validate(object, type))
                .flatMap(Set::stream).collect(Collectors.toSet());
        if (!violations.isEmpty()) {
            throw new ConstraintViolationException(violations);
        }
    }

}
