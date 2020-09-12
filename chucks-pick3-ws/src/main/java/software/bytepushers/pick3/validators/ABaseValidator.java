package software.bytepushers.pick3.validators;

import javax.validation.ConstraintValidatorContext;
import javax.validation.ConstraintValidatorContext.ConstraintViolationBuilder;

public abstract class ABaseValidator {

    protected void buildCustomErrorMessage(final ConstraintValidatorContext constraintValidatorContext, String message) {
        ConstraintViolationBuilder builder = constraintValidatorContext.buildConstraintViolationWithTemplate(message);
        builder.addConstraintViolation();
        constraintValidatorContext.disableDefaultConstraintViolation();
    }

}
