package software.bytepushers.pick3.repositories;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.AccountType;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountType, Long> {

    @Cacheable(value = "accounts", unless = "#result == null")
    Optional<AccountType> findByName(String name);

}