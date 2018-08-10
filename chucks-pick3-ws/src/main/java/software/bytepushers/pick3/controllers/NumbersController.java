package software.bytepushers.pick3.controllers;

import org.leandreck.endpoints.annotations.TypeScriptEndpoint;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.controllers.exceptions.MalformedRequestException;
import software.bytepushers.pick3.services.Pick3PlaysService;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@EnableWebMvc
public class NumbersController {

    private final Pick3PlaysMapper pick3PlaysMapper;
    private final Pick3PlaysService pick3PlaysService;

    public NumbersController(Pick3PlaysService pick3PlaysService, Pick3PlaysMapper pick3PlaysMapper) {
        this.pick3PlaysService = pick3PlaysService;
        this.pick3PlaysMapper = pick3PlaysMapper;
    }

    @RequestMapping(path = "/numbers",
                    method=RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Pick3PlaysResponse getNumbers(Integer winNumber,
                                         @DateTimeFormat(pattern="yyyy-MM-dd") @RequestParam LocalDate winDrawDate,
                                         @DateTimeFormat(pattern="yyyy-MM-dd") @RequestParam LocalDate futureDrawDate,
                                         DrawingTime winDrawTime, DrawingTime futureDrawTime) throws Exception{
        if(winNumber < 0 || 999 < winNumber)
            throw new MalformedRequestException("winNumber must be within bounds [0, 999]");

        if (winDrawDate.atStartOfDay().isAfter(LocalDate.now().atStartOfDay().plusDays(1)))
            throw new MalformedRequestException("winDrawDate cannot be a future date");

        if (futureDrawDate.atStartOfDay().isBefore(LocalDate.now().atStartOfDay()))
            throw new MalformedRequestException("futureDrawDate cannot be a past date");

        return pick3PlaysMapper.pick3PlaysToPick3PlaysResponse(pick3PlaysService.getPick3Plays(winNumber,
                winDrawDate, winDrawTime, futureDrawDate, futureDrawTime));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MalformedRequestException.class)
    public List<String> handleMalformedRequestExceptions(MalformedRequestException ex) {
        return ex.getMessages() == null ? Collections.emptyList() : ex.getMessages();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<String> handleArgumentNotValidExceptions(MethodArgumentNotValidException ex) {
        return ex.getBindingResult()
                .getAllErrors().stream()
                .map(ObjectError::getDefaultMessage)
                .collect(Collectors.toList());
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public List<String> handleConstraintValidationExceptions(ConstraintViolationException ex) {
        return ex.getConstraintViolations()
                .stream()
                .map(ConstraintViolation::getMessage)
                .collect(Collectors.toList());
    }
}
