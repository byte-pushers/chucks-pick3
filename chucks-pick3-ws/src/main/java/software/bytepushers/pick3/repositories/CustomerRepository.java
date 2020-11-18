package software.bytepushers.pick3.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import software.bytepushers.pick3.domain.Customer;

import java.util.List;
import java.util.Optional;

/**
 * Customer repository layer.
 */
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    /**
     * Fetching the customer details using first name.
     *
     * @param firstName for the where clause to fetch the data
     * @return the customer details.
     */
    List<Customer> findByFirstNameAndIsDisabledTrue(String firstName);

    /**
     * Fetching the customer details by id if and only if it is true.
     *
     * @param id of customer id
     * @return the customer if possible
     */
    Optional<Customer> findByIdAndIsDisabledTrue(Long id);
}
