package software.bytepushers.pick3.controllers;

import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.domain.Role;
import software.bytepushers.pick3.repositories.RoleRepository;

import java.util.List;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.ROLES_END_POINT;

/**
 * The rest endpoint implementation for the User operations
 */
@RestController
@RequestMapping(ROLES_END_POINT)
public class RoleController {

    private final RoleRepository roleRepository;

    public RoleController(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * The rest endpoint is responsible for creating/adding/saving the user details.
     */
    @PostMapping
    public void save(@RequestBody List<String> roles) {
        roles.forEach(role -> {
            Role role1 = new Role();
            role1.setName(role);
            this.roleRepository.save(role1);
        });
    }

    /**
     * The rest endpoint implementation is responsible for fetching the all available roles.
     *
     * @return the list of roles.
     */
    @GetMapping
    public List<String> getRoles() {
        return this.roleRepository.findAll().stream().map(Role::getName).collect(Collectors.toList());
    }

}
