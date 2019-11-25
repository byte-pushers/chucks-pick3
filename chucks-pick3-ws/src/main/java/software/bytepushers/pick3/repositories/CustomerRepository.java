package software.bytepushers.pick3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import software.bytepushers.pick3.domain.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByFirstName(String firstName);
}
