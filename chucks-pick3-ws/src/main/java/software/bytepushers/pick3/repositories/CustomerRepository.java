package software.bytepushers.pick3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.Customer;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByFirstName(String firstName);
}
