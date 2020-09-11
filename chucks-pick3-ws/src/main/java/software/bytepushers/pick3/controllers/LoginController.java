package software.bytepushers.pick3.controllers;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import software.bytepushers.pick3.dto.LoginDto;
import software.bytepushers.pick3.dto.LoginResponseDto;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.services.UserService;

import javax.validation.Valid;
import java.util.Date;

import static software.bytepushers.pick3.config.security.SecurityConstants.*;

/**
 * Authentication rest endpoints.
 */
@RestController
@RequestMapping(LOGIN_END_POINT)
public class LoginController {

    private static final Logger LOGGER = LogManager.getLogger();

    private final AuthenticationManager authenticationManager;

    private final UserService userService;

    public LoginController(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    /**
     * The rest endpoint implementation for the login process.
     *
     * @param loginDto with user credentials
     * @return the logged in user details
     */
    @PostMapping
    public ResponseEntity<LoginResponseDto> login(@RequestBody @Valid LoginDto loginDto) {
        try {
            String username = loginDto.getUsername();
            String password = loginDto.getPassword();
            LOGGER.info("Login. Username: {}", username);
            UsernamePasswordAuthenticationToken authRequest = new UsernamePasswordAuthenticationToken(username, password);
            this.authenticationManager.authenticate(authRequest);
            UserDto userDetails = this.userService.getByUsername(username);
            LOGGER.info("Login Successful. Username: {}", username);
            return new ResponseEntity<>(new LoginResponseDto(jwtToken(userDetails), userDetails), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Login error: {}", e.getMessage(), e);
            throw new UsernameNotFoundException("Invallid credentials");
        }
    }

    private String jwtToken(final UserDto userDetails) {
        return Jwts.builder().setSubject(userDetails.getUsername())
                .setIssuer(String.join(JWT_ROLE_JOIN_DELIMITER, userDetails.getRoles()))
                .setExpiration(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_TIME))
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes())).compact();
    }

}
