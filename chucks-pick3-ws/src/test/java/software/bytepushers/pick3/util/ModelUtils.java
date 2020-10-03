package software.bytepushers.pick3.util;

import software.bytepushers.pick3.component.ApplicationUtils;
import software.bytepushers.pick3.domain.Customer;
import software.bytepushers.pick3.domain.Role;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.LoginDto;
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
        Role role = new Role();
        role.setName(userDto.getType().getRoleName());
        userEntity.setId(1L);
        userEntity.setAccountType(accountType);
        userEntity.setPassword(USER_BCRYPT_ENCODED_PASSWORD);
        userEntity.setRoles(Collections.singleton(role));
        return userEntity;
    }

    public static LoginDto loginDto() {
        LoginDto loginDto = new LoginDto();
        loginDto.setUsername(USER_USERNAME);
        loginDto.setPassword(USER_PASSWORD);
        return loginDto;
    }

    public static Customer customer() {
        Customer customer = new Customer();
        customer.setCellPhoneType(USER_CELL_PHONE_TYPE);
        customer.setEmail(USER_EMAIL);
        customer.setFirstName(USER_FIRST_NAME);
        customer.setLastName(USER_LAST_NAME);
        customer.setGambleFrequency(USER_GAMBLE_FREQUENCY);
        customer.setMiddleName(USER_MIDDLE_NAME);
        customer.setPhoneNumber(USER_PHONE);
        customer.setState(USER_STATE);
        customer.setZipCode(USER_ZIPCODE);
        return customer;
    }

    public static software.bytepushers.pick3.domain.AccountType accountType() {
        software.bytepushers.pick3.domain.AccountType accountType = new software.bytepushers.pick3.domain.AccountType();
        accountType.setId(1L);
        accountType.setName(AccountType.GUEST.name());
        return accountType;
    }

    public static Role role() {
        Role role = new Role();
        role.setId(1L);
        role.setName(AccountType.GUEST.name());
        return role;
    }
}
