package software.bytepushers.pick3.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.bytepushers.pick3.domain.Role;
import software.bytepushers.pick3.dto.enums.AccountType;
import software.bytepushers.pick3.repositories.RoleRepository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static software.bytepushers.pick3.config.security.SecurityConstants.ROLES_END_POINT;

/**
 * The rest endpoint implementation for the User operations
 */
@Log4j2
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
    public void save() {
        Arrays.asList(AccountType.values()).forEach(accountType -> {
            Optional<Role> accountOptional = this.roleRepository.findByName(accountType.getRoleName());
            if (accountOptional.isEmpty()) {
                Role account = new Role();
                account.setName(accountType.name());
                this.roleRepository.save(account);
            }
        });
    }

    /**
     * The rest endpoint implementation is responsible for fetching the all available roles.
     *
     * @return the list of roles.
     */
    @GetMapping
    public List<String> getRoles() {
        return this.roleRepository.findAll().stream().map(role -> {
            log.trace("Role: {}", role.getId());
            return role.getName();
        }).collect(Collectors.toList());
    }

}
