package software.bytepushers.pick3.controllers;

import org.junit.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpServletResponse;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.repositories.CustomerRepository;
import software.bytepushers.pick3.util.ModelUtils;

import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

/**
 * The test cases for the user controller.
 */
public class CustomerControllerTest extends AbstractControllerTest {

    @MockBean
    private CustomerRepository customerRepository;

    /**
     * The test case implementation to validate the health endpoint of the application
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testPingEndpoint() throws Exception {
        MockHttpServletResponse response = mvc.perform(get("/customers/ping")
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "Ping must be responded with valid output to check health of the application";
    }

    /**
     * The test case implementation is responsible for fetching the all customer endpoint
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testGetAllCustomersEndpoint() throws Exception {
        Mockito.when(this.customerRepository.findAll()).thenReturn(Collections.emptyList());
        MockHttpServletResponse response = mvc.perform(get("/customers")
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "Ping must be responded with valid output to check health of the application";
    }

    /**
     * The test case implementation is responsible for validating the create customer operation with missing request body.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testCreateCustomerEndpointMissingRequestBody() throws Exception {
        Customer customer = ModelUtils.customer();
        Mockito.when(this.customerRepository.save(customer)).thenReturn(customer);
        MockHttpServletResponse response = mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Create customer must request request body to create customer";
    }

    /**
     * The test case implementation is responsible for validating the create customer with valid request body.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testCreateCustomerEndpoint() throws Exception {
        Customer customer = ModelUtils.customer();
        String requestBodyJsonString = this.objectMapper.writeValueAsString(customer);
        Mockito.when(this.customerRepository.save(customer)).thenReturn(customer);
        MockHttpServletResponse response = mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJsonString)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.OK.value() : "Customer must be created successfully if all details are supplied.";
    }

    /**
     * The test case implementation is responsible for validating the create customer with valid request body.
     *
     * @throws Exception if something went wrong in request mapping.
     */
    @Test
    public void testCreateCustomerEndpointWithMissingRequiredDetails() throws Exception {
        Customer customer = new Customer();
        String requestBodyJsonString = this.objectMapper.writeValueAsString(customer);
        Mockito.when(this.customerRepository.save(customer)).thenReturn(customer);
        MockHttpServletResponse response = mvc.perform(post("/customers")
                .contentType(MediaType.APPLICATION_JSON)
                .content(requestBodyJsonString)).andReturn().getResponse();
        assert response.getStatus() == HttpStatus.BAD_REQUEST.value() : "Create customer endpoint must required mandatory details to create.";
    }
}