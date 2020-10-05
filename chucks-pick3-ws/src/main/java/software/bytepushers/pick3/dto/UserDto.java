package software.bytepushers.pick3.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.EnumUtils;
import software.bytepushers.pick3.domain.User;
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

    public static UserDto fromEntity(User user) {
        UserDto userdto = new UserDto();
        userdto.setUser(UserDetailsDto.fromEntity(user));
        userdto.setType(EnumUtils.getEnum(AccountType.class, user.getAccountType().getName()));
        return userdto;
    }

}
