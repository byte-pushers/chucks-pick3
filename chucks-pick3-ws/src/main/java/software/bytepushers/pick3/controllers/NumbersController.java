package software.bytepushers.pick3.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.services.Pick3PlaysService;

import javax.validation.constraints.Future;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Past;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class NumbersController {

    private final Pick3PlaysMapper pick3PlaysMapper;
    private final Pick3PlaysService pick3PlaysService;

    public NumbersController(Pick3PlaysService pick3PlaysService, Pick3PlaysMapper pick3PlaysMapper) {
        this.pick3PlaysService = pick3PlaysService;
        this.pick3PlaysMapper = pick3PlaysMapper;
    }

    @GetMapping(path = "/numbers")
    public Pick3PlaysResponse getNumbers(@RequestParam("winNumber") @Max(999) @Min(0)
                                                 Integer winningNumber,
                                         @RequestParam("winDate") @DateTimeFormat(pattern = "yyyy-MM-dd")
                                         @Past(message = "{errors.winDate.past}")
                                                 Date winningDrawDate,
                                         @RequestParam("futureDrawDate") @DateTimeFormat(pattern = "yyyy-MM-dd")
                                         @Future(message = "{errors.futureDrawDate.future")
                                                 Date futureDrawDate,
                                         @RequestParam("winTime") DrawingTime winningDrawTime,
                                         @RequestParam("futureDrawTime") DrawingTime futureDrawTime) {
        return pick3PlaysMapper.pick3PlaysToPick3PlaysResponse(pick3PlaysService.getPick3Plays(winningNumber,
                winningDrawDate, winningDrawTime, futureDrawDate, futureDrawTime));
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public List<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
        return ex.getBindingResult()
                .getAllErrors().stream()
                .map(ObjectError::getDefaultMessage)
                .collect(Collectors.toList());
    }

}
