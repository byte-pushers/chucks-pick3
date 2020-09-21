package software.bytepushers.pick3.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.repositories.CustomerRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@EnableWebMvc
public class CustomerController {

    private final CustomerRepository customerRepository;

    public CustomerController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @RequestMapping(path = "/customers/ping", method = RequestMethod.GET)
    public Map<String, String> ping() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @GetMapping("/customers")
    public List<Customer> all() {
        return customerRepository.findAll();
    }

    @PostMapping("/customers")
    public Customer createCustomer(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

}
