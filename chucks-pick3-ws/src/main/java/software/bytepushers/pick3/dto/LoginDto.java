package software.bytepushers.pick3.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

/**
 * Login request dto model
 */
@Getter
@Setter
@NoArgsConstructor
public class LoginDto {

    @NotEmpty(message = "{user.username.required}")
    private String username;

    @NotEmpty(message = "{user.password.required}")
    private String password;

}