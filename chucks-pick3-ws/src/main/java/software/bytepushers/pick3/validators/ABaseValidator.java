package software.bytepushers.pick3.validators;

import javax.validation.ConstraintValidatorContext;
import javax.validation.ConstraintValidatorContext.ConstraintViolationBuilder;

/**
 * Abstract validator build to add cusom messages into constraint violations
 */
public abstract class ABaseValidator {

    /**
     * The method implementation is responsible for building the custom error messages into the constraints violations.
     *
     * @param constraintValidatorContext to add custom validation message
     * @param message                    to add into constraints.
     */
    protected void buildCustomErrorMessage(final ConstraintValidatorContext constraintValidatorContext, String message) {
        ConstraintViolationBuilder builder = constraintValidatorContext.buildConstraintViolationWithTemplate(message);
        builder.addConstraintViolation();
        constraintValidatorContext.disableDefaultConstraintViolation();
    }

}
