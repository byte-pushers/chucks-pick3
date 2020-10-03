package software.bytepushers.pick3.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.commons.lang3.EnumUtils;
import software.bytepushers.pick3.component.ApplicationUtils;
import software.bytepushers.pick3.domain.Role;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.enums.AccountType;
import software.bytepushers.pick3.validators.UserValidator;

import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * User DTO class
 */
@Getter
@Setter
@NoArgsConstructor
@UserValidator(groups = {UserDto.CreateUserRequest.class})
public class UserDto {

    @NotNull(groups = {UpdateUserRequest.class}, message = "{user.id.required}")
    private Long id;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.firstname.required}")
    @Size(groups = {CreateUserRequest.class, UpdateUserRequest.class}, min = 2, max = 50, message = "{user.firstname.size}")
    private String firstName;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.lastname.required}")
    @Size(groups = {CreateUserRequest.class, UpdateUserRequest.class}, min = 1, max = 50, message = "{user.lastname.size}")
    private String lastName;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.email.required}")
    @Email(groups = {CreateUserRequest.class, UpdateUserRequest.class}, message = "{user.email.invalid}")
    private String email;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.phone.required}")
    @Pattern(groups = {CreateUserRequest.class, UpdateUserRequest.class}, regexp = "(^$|[0-9]{10})", message = "{phone.number.invalid}")
    private String phone;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.state.required}")
    @Size(groups = {CreateUserRequest.class, UpdateUserRequest.class}, max = 2, message = "{user.state.name.size}")
    private String state;

    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.username.required}")
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotEmpty(groups = {CreateUserRequest.class}, message = "{user.password.required}")
    @Size(groups = {CreateUserRequest.class, UpdateUserRequest.class}, min = 8, message = "{user.password.size}")
    private String password;

    @NotNull(groups = {CreateUserRequest.class}, message = "{user.account.type.required}")
    private AccountType type;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private List<String> roles = new ArrayList<>();

    public interface CreateUserRequest {
    }

    public interface UpdateUserRequest {
    }

    public static UserDto fromEntity(User user) {
        UserDto userdto = new UserDto();
        ApplicationUtils.copyProperties(user, userdto);
        userdto.setRoles(user.getRoles().stream().map(Role::getName).collect(Collectors.toList()));
        userdto.setType(EnumUtils.getEnum(software.bytepushers.pick3.dto.enums.AccountType.class, user.getAccountType().getName()));
        return userdto;
    }

}
