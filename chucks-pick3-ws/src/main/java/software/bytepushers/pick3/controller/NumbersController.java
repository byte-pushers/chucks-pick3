package software.bytepushers.pick3.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.api.DrawingTime;
import software.bytepushers.pick3.api.State;
import software.bytepushers.pick3.dto.NumbersResult;
import software.bytepushers.pick3.service.NumbersService;

import java.util.Date;

@RestController
@EnableWebMvc
public class NumbersController {

    @Autowired
    NumbersService numbersService;

    @GetMapping(path="/numbers/{numbers:[0-9]{3}}.json")
    public NumbersResult getNumbers(@PathVariable("numbers") int winningNumber,
                                    @RequestParam("state") State state,
                                    @RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date,
                                    @RequestParam("time") DrawingTime time) {

        int[] numbers = numbersService.getNumbers(winningNumber, state, date, time);

        NumbersResult result = new NumbersResult();
        result.setDrawingState(state);
        result.setDrawingTime(time);
        result.setDrawingNumbers(numbers);

        return result;
    }
}
