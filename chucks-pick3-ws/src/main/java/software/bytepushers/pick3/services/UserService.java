package software.bytepushers.pick3.services;

import software.bytepushers.pick3.dto.UserDetailsDto;
import software.bytepushers.pick3.dto.UserDto;

/**
 * User service layer
 */
public interface UserService {

    /**
     * The method implementation is resonsible foe fetching the User based on id.
     *
     * @param id to fetch the user details
     * @return the user details
     */
    UserDetailsDto getById(Long id);

    /**
     * The method implementation is responsible for fetching the user details based on username
     *
     * @param username to fetch the user details
     * @return the user details.
     */
    UserDetailsDto getByUsername(String username);

    /**
     * The method implementation is responsible for creating/adding/saving the user into the system.
     *
     * @param userDto with required details to create/save/add
     */
    UserDetailsDto save(UserDto userDto);

    /**
     * The method implementation is responsible for updating the existing user into the system.
     *
     * @param userDto with required details to update
     */
    UserDetailsDto update(UserDto userDto);

    /**
     * The method implementation is responsible for deleting the existing user.
     *
     * @param id of the user to delete.
     */
    void delete(Long id);
}