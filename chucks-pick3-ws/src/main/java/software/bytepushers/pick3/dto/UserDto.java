package software.bytepushers.pick3.dto;

import lombok.Getter;
import lombok.Setter;
import software.bytepushers.pick3.dto.enums.AccountType;

import javax.validation.constraints.NotNull;

/**
 * User DTO class
 */
@Getter
@Setter
public class UserDto {

    @NotNull(message = "{user.details.required}")
    private UserDetailsDto user;

    @NotNull(groups = {CreateUserRequest.class}, message = "{user.account.type.required}")
    private AccountType type;

    public interface CreateUserRequest {
    }

    public interface UpdateUserRequest {
    }

}
