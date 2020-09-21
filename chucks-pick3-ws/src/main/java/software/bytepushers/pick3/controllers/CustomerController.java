package software.bytepushers.pick3.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.repositories.CustomerRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The rest endpoint implementations for the customer operations
 */
@RestController
@EnableWebMvc
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    /**
     * The rest endpoint implementation is responsible for handling status check of the application
     *
     * @return the "Hello World!" if the application up and running
     */
    @GetMapping("/ping")
    public Map<String, String> ping() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    /**
     * The rest endpoint implementation is responsible for fetching the all customers from the application.
     *
     * @return the list of customers.
     */
    @GetMapping
    public List<Customer> all() {
        return customerRepository.findAll();
    }

    /**
     * The rest endpoint implementation is responsible for creating/saving/adding the customer into the system.
     *
     * @param customer with details to persist
     * @return the created customer details
     */
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

}
