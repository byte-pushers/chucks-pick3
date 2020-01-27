package software.bytepushers.pick3.config;

import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.repositories.CustomerRepository;

/*@Configuration
@Slf4j*/
class LoadDatabaseConfig {

    /*@Bean
    CommandLineRunner initDatabase(CustomerRepository customerRepository) {
        return args -> {
            log.info("Pre-Loading " + customerRepository.save(new Customer("Jame", "jame@gmail.com", "Michigan", "48507",
                    "iPhone", "sometime")));
            log.info("Pre-Loading " + customerRepository.save(new Customer("David", "david@gmail.com", "Texas", "76227",
                    "iPhone", "always")));
        };
    }*/
}