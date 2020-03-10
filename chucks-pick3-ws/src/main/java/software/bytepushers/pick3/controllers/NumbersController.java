package software.bytepushers.pick3.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.ConversionService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentConversionNotSupportedException;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.controllers.exceptions.MalformedRequestException;
import software.bytepushers.pick3.domain.Pick3Plays;
import software.bytepushers.pick3.services.Pick3PlaysService;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@EnableWebMvc
public class NumbersController {

    @Autowired
    ConversionService conversionService;

    private final Pick3PlaysMapper pick3PlaysMapper;
    private final Pick3PlaysService pick3PlaysService;

    public NumbersController(Pick3PlaysService pick3PlaysService, Pick3PlaysMapper pick3PlaysMapper) {
        this.pick3PlaysService = pick3PlaysService;
        this.pick3PlaysMapper = pick3PlaysMapper;
    }

    @RequestMapping(path = "/numbers/ping", method = RequestMethod.GET)
    public Map<String, String> ping() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @RequestMapping(path = "/numbers",
                    method = RequestMethod.GET,
                    produces = MediaType.APPLICATION_JSON_VALUE)
    public Pick3PlaysResponse getNumbers(@RequestParam("winNumber") Integer winNumber,
                                         @RequestParam("winDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate winDrawDate,
                                         @RequestParam("futureDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate futureDrawDate,
                                         @RequestParam("winDrawTime") DrawingTime winDrawTime,
                                         @RequestParam("futureDrawTime") DrawingTime futureDrawTime) throws Exception {
        System.out.println("******** Inside getNumbers() method.");
        if(winNumber < 0 || 999 < winNumber)
            throw new MalformedRequestException("winNumber must be within bounds [0, 999]");

        if (winDrawDate.atStartOfDay().isAfter(LocalDate.now().atStartOfDay().plusDays(1)))
            throw new MalformedRequestException("winDrawDate cannot be a future date");

        if (futureDrawDate.atStartOfDay().isBefore(LocalDate.now().atStartOfDay()))
            throw new MalformedRequestException("futureDrawDate cannot be a past date");

        /*return pick3PlaysMapper.pick3PlaysToPick3PlaysResponse(
                pick3PlaysService.getPick3Plays(winNumber, winDrawDate, winDrawTime, futureDrawDate, futureDrawTime)
        );*/
        Pick3Plays pick3Plays = new Pick3Plays();
        pick3Plays.setPlays(Arrays.stream(new int[][]{ {0, 0, 0}, {1,2,3}, {0,2,3}, {0,0,1}, {9,9,9} })
                .map(digits -> digits[0] * 100 + digits[1] * 10 + digits[2])
                .collect(Collectors.toList()));

        pick3Plays.setDrawingDate(futureDrawDate);
        pick3Plays.setDrawingTime(futureDrawTime);


        return pick3PlaysMapper.pick3PlaysToPick3PlaysResponse(pick3Plays);
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

    @ExceptionHandler({ MethodArgumentConversionNotSupportedException.class })
    public ResponseEntity<Object> handleMethodArgumentTypeMismatch(MethodArgumentConversionNotSupportedException ex, WebRequest request) {
        String error = ex.getName() + " should be of type " + ex.getRequiredType().getName();

        ApiError apiError = new ApiError(HttpStatus.BAD_REQUEST, ex.getLocalizedMessage(), error);
        return new ResponseEntity<>(apiError, new HttpHeaders(), apiError.getStatus());
    }
}
