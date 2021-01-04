package software.bytepushers.pick3.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.exceptions.MalformedRequestException;
import software.bytepushers.pick3.repositories.CustomerRepository;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * The rest endpoint implementations for the customer operations
 */
@Log4j2
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
    @CrossOrigin(origins = "http://localhost:4200")
    public Customer createCustomer(@RequestBody @Valid Customer customer) {
        return customerRepository.save(customer);
    }

    /**
     * The rest endpoint implementation is responsible for updating the existing customer
     *
     * @param customer to update
     * @return the updated customer details
     */
    @PutMapping
    public Customer updateCustomer(@RequestBody Customer customer) {
        Long customerId = customer.getId();
        log.info("Trying to update customer: {}", customerId);
        if (customerId == null) {
            throw new MalformedRequestException("Customer id required to update");
        }
        Customer customerById = this.customerRepository.findByIdAndIsDisabledFalse(customerId)
                .orElseThrow(() -> new MalformedRequestException("Customer not found"));
        log.info("Found customer to update");
        BeanUtils.copyProperties(customer, customerById, "id");
        return this.customerRepository.save(customerById);
    }

    /**
     * The rest endpoint implementation is responsible for fetching the customer details
     *
     * @param customerId to fetch customer details
     * @return the customer details
     */
    @GetMapping("/{customerId}")
    public Customer getById(@PathVariable Long customerId) {
        log.info("Trying to fetch customer: {}", customerId);
        return this.customerRepository.findByIdAndIsDisabledFalse(customerId).orElseThrow(()
                -> new MalformedRequestException("Customer not found"));
    }

    /**
     * The rest endpoint implementation is responsible for deleting the customer details
     *
     * @param customerId to delete customer
     */
    @DeleteMapping("/{customerId}")
    public void delete(@PathVariable Long customerId) {
        log.info("Trying to delete customer: {}", customerId);
        Customer customer = getById(customerId);
        customer.setIsDisabled(Boolean.TRUE);
        this.customerRepository.save(customer);
    }
}
