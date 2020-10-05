package software.bytepushers.pick3.dto;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.EnumUtils;
import software.bytepushers.pick3.dto.enums.AccountType;

import javax.validation.constraints.NotNull;

/**
 * The account type dto model.
 */
@Getter
@Setter
public class AccountTypeDto {

    @NotNull(groups = {UserDto.CreateUserRequest.class}, message = "{user.account.type.required}")
    private AccountType type;

    public static AccountTypeDto fromEntity(software.bytepushers.pick3.domain.AccountType type) {
        AccountTypeDto accountType = new AccountTypeDto();
        accountType.setType(EnumUtils.getEnum(AccountType.class, type.getName()));
        return accountType;
    }

}
