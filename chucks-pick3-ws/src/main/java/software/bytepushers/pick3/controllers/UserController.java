package software.bytepushers.pick3.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.UserDto.CreateUserRequest;
import software.bytepushers.pick3.dto.UserDto.UpdateUserRequest;
import software.bytepushers.pick3.services.UserService;

import static software.bytepushers.pick3.config.security.SecurityConstants.USERS_END_POINT;
//TODO: Implement refresh token
//TODO: Move secret key to environment variable:
//TODO: known issue on getting gateway timeout error. It should return actual error message.

/**
 * The rest endpoint implementation for the User operations
 */
@RestController
@RequestMapping(USERS_END_POINT)
public class UserController {

    private final static Logger LOGGER = LogManager.getLogger();

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
        LOGGER.info("Fetch User. Id: {}", id);
        return this.userServiceImpl.getById(id);
    }

    /**
     * The rest endpoint is responsible for creating/adding/saving the user details.
     *
     * @param userDto with required details as a request paylod.
     */
    @PostMapping
    public void save(@RequestBody @Validated(CreateUserRequest.class) UserDto userDto) {
        LOGGER.info("Save User. username: {}", userDto.getUsername());
        this.userServiceImpl.save(userDto);
    }

    /**
     * The rest endpoint is responsible for updating the user details.
     *
     * @param userDto userDto with required details as a request paylod.
     */
    @PutMapping
    public void update(@RequestBody @Validated(UpdateUserRequest.class) UserDto userDto) {
        LOGGER.info("Update User. Id: {}", userDto.getId());
        this.userServiceImpl.update(userDto);
    }

    /**
     * The rest endpoint is responsible for deleting the user details.
     *
     * @param id of the user to delete.
     */
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        LOGGER.info("Delete User. Id: {}", id);
        this.userServiceImpl.delete(id);
    }

}
