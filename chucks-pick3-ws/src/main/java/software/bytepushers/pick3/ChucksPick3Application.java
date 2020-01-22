package software.bytepushers.pick3;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
// import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class ChucksPick3Application extends SpringBootServletInitializer {
    /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(ChucksPick3Application.class);
    }*/
    public static void main(String[] args) {
        SpringApplication.run(ChucksPick3Application.class, args);
    }
}
