package software.bytepushers.pick3.config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException;
import software.bytepushers.pick3.dto.ApiError;
import software.bytepushers.pick3.exceptions.MalformedRequestException;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Global rest exception handler for the rest apis.
 */
@RestControllerAdvice
public class RestExceptionHandler {

    private static final String INVALID_REQUEST = "Invalid Request";

    /**
     * Bad request handler for {@link MalformedRequestException}
     *
     * @param ex to catch if it is the instance of {@link MalformedRequestException}
     * @return the error response as bad request
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MalformedRequestException.class)
    public ResponseEntity<Object> handleMalformedRequestExceptions(MalformedRequestException ex) {
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), ex.getMessages());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    /**
     * Bad request handler for {@link MalformedRequestException}
     *
     * @param ex to catch if it is the instance of {@link MalformedRequestException}
     * @return the error response as bad request
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleArgumentNotValidExceptions(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
                .getAllErrors().stream()
                .map(ObjectError::getDefaultMessage)
                .collect(Collectors.toList());
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, INVALID_REQUEST, errors);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    /**
     * Bad request handler for {@link ConstraintViolationException}
     *
     * @param ex to catch if it is the instance of {@link ConstraintViolationException}
     * @return the error response as bad request
     */
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Object> handleConstraintValidationExceptions(ConstraintViolationException ex) {
        List<String> errors = ex.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toList());
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, INVALID_REQUEST, errors);
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }

    /**
     * Bad request handler for {@link MethodArgumentConversionNotSupportedException}
     *
     * @param ex to catch if it is the instance of {@link MethodArgumentConversionNotSupportedException}
     * @return the error response as bad request
     */
    @ExceptionHandler({MethodArgumentConversionNotSupportedException.class})
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentConversionNotSupportedException ex) {
        String error = ex.getName() + " should be of type " + (ex.getRequiredType() != null ? ex.getRequiredType().getName() : null);
        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }

    /**
     * Unauthorised request handler for {@link UsernameNotFoundException}
     *
     * @param ex to catch if it is the instance of {@link UsernameNotFoundException}
     * @return the error response as unauthorized
     */
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiError> handleUnauthorized(UsernameNotFoundException ex) {
        ApiError apiError = new ApiError(HttpStatus.UNAUTHORIZED, ex.getLocalizedMessage(), ex.getMessage());
        return new ResponseEntity<>(apiError, apiError.getStatus());
    }
}
