package software.bytepushers.pick3.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;

/**
 * Abstract controller test class for controller setup
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public abstract class AbstractControllerTest {

    @Autowired
    protected WebApplicationContext applicationContext;

    @Autowired
    protected ObjectMapper objectMapper;

    protected MockMvc mvc;

    @Before
    public void before() throws Exception {
        mvc = MockMvcBuilders.webAppContextSetup(applicationContext).apply(springSecurity()).build();
    }

}
