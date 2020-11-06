package software.bytepushers.pick3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.User;

import java.util.Optional;

/**
 * User repository layer.
 */
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

}
