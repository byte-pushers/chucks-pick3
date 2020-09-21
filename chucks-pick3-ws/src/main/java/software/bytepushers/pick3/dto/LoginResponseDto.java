package software.bytepushers.pick3.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * Login response dto model
 */
@Data
@AllArgsConstructor
public class LoginResponseDto {

    private String token;

    private UserDto userDetail;

}
