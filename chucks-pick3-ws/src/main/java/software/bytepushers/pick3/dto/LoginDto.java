package software.bytepushers.pick3.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

/**
 *
 */
@Data
public class LoginDto {

    @NotEmpty(message = "{user.username.required}")
    private String username;

    @NotEmpty(message = "{user.password.required}")
    private String password;

}