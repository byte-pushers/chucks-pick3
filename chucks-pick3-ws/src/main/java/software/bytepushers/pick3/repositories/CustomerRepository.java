package software.bytepushers.pick3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.Customer;

import java.util.List;

/**
 * Customer repository layer.
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * fetching the customer details using first name.
     *
     * @param firstName for the where clause to fetch the data
     * @return the customer details.
     */
    List<Customer> findByFirstName(String firstName);
}
