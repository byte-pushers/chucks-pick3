package software.bytepushers.pick3.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import software.bytepushers.pick3.validators.UserValidator;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

/**
 * User DTO class
 */
@Data
@UserValidator
public class UserDto {

    private Long id;

    @NotEmpty(message = "{user.firstname.required}")
    @Size(min = 2, max = 50, message = "{user.firstname.size}")
    private String firstName;

    @NotEmpty(message = "{user.lastname.required}")
    @Size(min = 1, max = 50, message = "{user.lastname.size}")
    private String lastName;

    @NotEmpty(message = "{user.email.required}")
    @Email(message = "{user.email.invalid}")
    private String email;

    @NotEmpty(message = "{user.phone.required}")
    @Pattern(regexp = "(^$|[0-9]{10})", message = "{phone.number.invalid}")
    private String phone;

    @NotEmpty(message = "{user.state.required}")
    @Size(max = 2, message = "{user.state.name.size}")
    private String state;

    @NotEmpty(message = "{user.username.required}")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(message = "{user.password.required}")
    @Size(min = 8, message = "{user.password.size}")
    private String password;

    private List<String> roles = new ArrayList<>();

}
