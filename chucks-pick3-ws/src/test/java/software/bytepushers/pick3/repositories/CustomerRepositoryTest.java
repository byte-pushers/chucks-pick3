package software.bytepushers.pick3.repositories;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.DisabledIfSystemProperty;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import software.bytepushers.pick3.domain.Customer;

import javax.sql.DataSource;
import java.util.List;

import static org.assertj.core.api.Java6Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace= AutoConfigureTestDatabase.Replace.NONE)
@DisabledIfSystemProperty(named="run.jpa.tests", matches="false")
public class CustomerRepositoryTest {

    @Autowired private DataSource dataSource;
    @Autowired private TestEntityManager entityManager;
    @Autowired private CustomerRepository customerRepository;

    @Before
    public void injectedComponentsAreNotNull() {
        assertThat(dataSource).isNotNull();
        assertThat(entityManager).isNotNull();
        assertThat(customerRepository).isNotNull();
    }

    @Test
    public void whenFindByNameThenReturnCustomer() {
        // given
        Customer expectedCustomer = new Customer("Alex", "alex@gmail.com", "Texas", "76227",
                "iPhone", "sometime");

        entityManager.persist(expectedCustomer);
        entityManager.flush();

        // when
        List<Customer> actualCustomers = customerRepository.findByFirstNameAndIsDisabledFalse(expectedCustomer.getFirstName());

        // then
        for (Customer actualCustomer : actualCustomers) {
            assertThat(actualCustomer.getFirstName()).isEqualTo(expectedCustomer.getFirstName());
        }

    }
}
