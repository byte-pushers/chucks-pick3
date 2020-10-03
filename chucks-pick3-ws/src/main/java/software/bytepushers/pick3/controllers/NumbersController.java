package software.bytepushers.pick3.controllers;

import lombok.extern.log4j.Log4j2;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.exceptions.MalformedRequestException;
import software.bytepushers.pick3.services.Pick3PlaysService;

import java.time.LocalDate;

@Log4j2
@EnableWebMvc
@RestController
public class NumbersController {

    private final Pick3PlaysMapper pick3PlaysMapper;

    private final Pick3PlaysService pick3PlaysService;

    public NumbersController(Pick3PlaysService pick3PlaysService, Pick3PlaysMapper pick3PlaysMapper) {
        this.pick3PlaysService = pick3PlaysService;
        this.pick3PlaysMapper = pick3PlaysMapper;
    }

    @GetMapping("/numbers")
    public Pick3PlaysResponse getNumbers(@RequestParam("winNumber") Integer winNumber,
                                         @RequestParam("winDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate winDrawDate,
                                         @RequestParam("futureDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate futureDrawDate,
                                         @RequestParam("winDrawTime") DrawingTime winDrawTime,
                                         @RequestParam("futureDrawTime") DrawingTime futureDrawTime) {
        log.info("******** Inside getNumbers() method.");
        if (winNumber < 0 || 999 < winNumber)
            throw new MalformedRequestException("winNumber must be within bounds [0, 999]");

        if (winDrawDate.atStartOfDay().isAfter(LocalDate.now().atStartOfDay().plusDays(1)))
            throw new MalformedRequestException("winDrawDate cannot be a future date");

        if (futureDrawDate.atStartOfDay().isBefore(LocalDate.now().atStartOfDay()))
            throw new MalformedRequestException("futureDrawDate cannot be a past date");

        return pick3PlaysMapper.pick3PlaysToPick3PlaysResponse(
                pick3PlaysService.getPick3Plays(winNumber, winDrawDate, winDrawTime, futureDrawDate, futureDrawTime)
        );
    }
}
