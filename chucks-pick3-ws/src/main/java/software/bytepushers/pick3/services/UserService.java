package software.bytepushers.pick3.services;

import software.bytepushers.pick3.dto.UserDTO;

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
    UserDTO getById(Long id);

    /**
     * The method implementation is responsible for creating/adding/saving the user into the system.
     *
     * @param userDto with required details to create/save/add
     */
    void save(UserDTO userDto);

    /**
     * The method implementation is responsible for updating the existing user into the system.
     *
     * @param userDto with required details to update
     */
    void update(UserDTO userDto);

    /**
     * The method implementation is responsible for deleting the existing user.
     *
     * @param id of the user to delete.
     */
    void delete(Long id);
}