package software.bytepushers.pick3.validators.impl;

import software.bytepushers.pick3.component.AppMessages;
import software.bytepushers.pick3.domain.User;
import software.bytepushers.pick3.dto.UserDto;
import software.bytepushers.pick3.repositories.UserRepository;
import software.bytepushers.pick3.validators.ABaseValidator;
import software.bytepushers.pick3.validators.UserValidator;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.Optional;

/**
 * User validator implementation.
 */
public class UserValidatorCheck extends ABaseValidator implements ConstraintValidator<UserValidator, UserDto> {

    private final UserRepository userRepository;

    private final AppMessages appMessages;

    public UserValidatorCheck(UserRepository userRepository, AppMessages appMessages) {
        this.userRepository = userRepository;
        this.appMessages = appMessages;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void initialize(UserValidator constraintAnnotation) {
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public boolean isValid(UserDto user, ConstraintValidatorContext constraintValidatorContext) {
        boolean isValid = true;
        Optional<User> optionalUser = this.userRepository.findByUsername(user.getUsername());
        if (optionalUser.isPresent()) {
            isValid = false;
            String message = this.appMessages.getMessage("user.username.already.used");
            buildCustomErrorMessage(constraintValidatorContext, message);
        }
        optionalUser = this.userRepository.findByEmail(user.getEmail());
        if (optionalUser.isPresent()) {
            isValid = false;
            String message = this.appMessages.getMessage("user.email.already.used");
            buildCustomErrorMessage(constraintValidatorContext, message);
        }
        return isValid;
    }
}
