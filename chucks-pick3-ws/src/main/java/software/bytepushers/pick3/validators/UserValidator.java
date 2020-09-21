package software.bytepushers.pick3.validators;


import software.bytepushers.pick3.validators.impl.UserValidatorCheck;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * The custom validator for User.
 */
@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = UserValidatorCheck.class)
public @interface UserValidator {

    /**
     * The default message.
     *
     * @return the default message if validation getting failed
     */
    String message() default "{user.details.missing}";

    /**
     * @return the configured groups
     */
    Class<?>[] groups() default {};

    /**
     * @return the configured payloads
     */
    Class<? extends Payload>[] payload() default {};
}
