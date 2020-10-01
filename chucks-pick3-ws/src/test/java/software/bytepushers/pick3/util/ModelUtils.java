package software.bytepushers.pick3.util;

import software.bytepushers.pick3.component.ApplicationUtils;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.dto.enums.AccountType;

import java.util.Collections;

import static software.bytepushers.pick3.util.TestConstants.*;

public class ModelUtils {

    public static UserDto userDto() {
        UserDto userDto = new UserDto();
        AccountType accountType = AccountType.PREMIUM;
        userDto.setType(accountType);
        userDto.setRoles(Collections.singletonList(accountType.getRoleName()));
        userDto.setEmail(USER_EMAIL);
        userDto.setFirstName(USER_FIRST_NAME);
        userDto.setLastName(USER_LAST_NAME);
        userDto.setPassword(USER_PASSWORD);
        userDto.setPhone(USER_PHONE);
        userDto.setState(USER_STATE);
        userDto.setUsername(USER_USERNAME);
        return userDto;
    }

    public static User userEntity() {
        User userEntity = new User();
        UserDto userDto = userDto();
        ApplicationUtils.copyProperties(userDto, userEntity);
        software.bytepushers.pick3.domain.AccountType accountType = new software.bytepushers.pick3.domain.AccountType();
        accountType.setName(userDto.getType().name());
        userEntity.setAccountType(accountType);
        return userEntity;
    }

}
