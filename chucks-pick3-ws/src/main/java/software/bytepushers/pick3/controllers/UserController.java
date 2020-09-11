package software.bytepushers.pick3.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.services.UserService;

import javax.validation.Valid;

/**
 * The rest endpoint implemntation for the User operations
 */
@RestController
@RequestMapping("/api/v1/users")
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
    public void save(@RequestBody @Valid UserDto userDto) {
        LOGGER.info("Save User. username: {}", userDto.getUsername());
        this.userServiceImpl.save(userDto);
    }

    /**
     * The rest endpoint is responsible for updating the user details.
     *
     * @param userDto userDto with required details as a request paylod.
     */
    @PutMapping
    public void update(@RequestBody UserDto userDto) {
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
