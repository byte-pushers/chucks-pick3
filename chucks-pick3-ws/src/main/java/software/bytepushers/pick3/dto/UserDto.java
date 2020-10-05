package software.bytepushers.pick3.dto;

import lombok.Getter;
import lombok.Setter;
import software.bytepushers.pick3.domain.User;

import javax.validation.constraints.NotNull;

/**
 * User DTO class
 */
@Getter
@Setter
public class UserDto {

    @NotNull(message = "{user.details.required}")
    private UserDetailsDto user;

    @NotNull(message = "{user.account.type.required}")
    private AccountTypeDto accountType;

    public interface CreateUserRequest {
    }

    public interface UpdateUserRequest {
    }

    public static UserDto fromEntity(User user) {
        UserDto userdto = new UserDto();
        userdto.setUser(UserDetailsDto.fromEntity(user));
        userdto.setAccountType(AccountTypeDto.fromEntity(user.getAccountType()));
        return userdto;
    }

}
