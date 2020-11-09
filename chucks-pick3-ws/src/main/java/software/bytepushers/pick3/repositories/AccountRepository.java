package software.bytepushers.pick3.repositories;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.AccountType;

import java.util.Optional;

/**
 * Account type repository layer.
 */
public interface AccountRepository extends JpaRepository<AccountType, Long> {

    /**
     * fetching the account type based on the name.
     *
     * @param name of the account type
     * @return the account type details.
     */
    @Cacheable(value = "accounts", unless = "#result == null")
    Optional<AccountType> findByName(String name);

}