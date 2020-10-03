package software.bytepushers.pick3.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.UserDto.CreateUserRequest;
import software.bytepushers.pick3.dto.UserDto.UpdateUserRequest;
import software.bytepushers.pick3.services.UserService;

import static software.bytepushers.pick3.config.security.SecurityConstants.USERS_END_POINT;
//TODO: Move secret key to environment variable:
//TODO: known issue on getting gateway timeout error. It should return actual error message.

/**
 * The rest endpoint implementation for the User operations
 */
@Log4j2
@RestController
@RequestMapping(USERS_END_POINT)
public class UserController {

    private final UserService userServiceImpl;

    public UserController(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    /**
     * The rest endpoint is responsible for fetching the user details by id.
     *
     * @param id of the user to fetch details
     * @return the user details
     */
    @GetMapping("/{id}")
    public UserDto userById(@PathVariable Long id) {
        log.info("Fetch User. Id: {}", id);
        return this.userServiceImpl.getById(id);
    }

    /**
     * The rest endpoint is responsible for creating/adding/saving the user details.
     *
     * @param userDto with required details as a request paylod.
     */
    @PostMapping
    public void save(@RequestBody @Validated(CreateUserRequest.class) UserDto userDto) {
        log.info("Save User. username: {}", userDto.getUsername());
        this.userServiceImpl.save(userDto);
        log.info("User updated. username: {}", userDto.getUsername());
    }

    /**
     * The rest endpoint is responsible for updating the user details.
     *
     * @param userDto userDto with required details as a request paylod.
     */
    @PutMapping
    public void update(@RequestBody @Validated(UpdateUserRequest.class) UserDto userDto) {
        log.info("Update User. Id: {}", userDto.getId());
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

}
