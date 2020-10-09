package software.bytepushers.pick3.repositories;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Cacheable(value = "user-roles", unless = "#result == null")
    Optional<Role> findByName(String name);

    @Cacheable(value = "user-roles-like", unless = "#result == null")
    Optional<Role> findByNameLike(String name);

}
