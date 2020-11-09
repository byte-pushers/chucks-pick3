package software.bytepushers.pick3.repositories;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.Role;

import java.util.Optional;

/**
 * Roles repository layer.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {

    /**
     * Fetching the Role details based on the role name
     *
     * @param name to use in where clause for fetching the role details
     * @return the role details.
     */
    @Cacheable(value = "user-roles", unless = "#result == null")
    Optional<Role> findByName(String name);

    /**
     * Fetching the Role details based on the role name (LIKE query)
     *
     * @param name to use in where clause for fetching the role details via like operation
     * @return the role details.
     */
    @Cacheable(value = "user-roles-like", unless = "#result == null")
    Optional<Role> findByNameLike(String name);

}
