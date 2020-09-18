package software.bytepushers.pick3.controllers;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.controllers.exceptions.MalformedRequestException;
import software.bytepushers.pick3.services.Pick3PlaysService;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RestController
@EnableWebMvc
public class NumbersController {

    private final static Logger LOGGER = LogManager.getLogger();

    private final Pick3PlaysMapper pick3PlaysMapper;

    private final Pick3PlaysService pick3PlaysService;

    public NumbersController(Pick3PlaysService pick3PlaysService, Pick3PlaysMapper pick3PlaysMapper) {
        this.pick3PlaysService = pick3PlaysService;
        this.pick3PlaysMapper = pick3PlaysMapper;
    }

    @GetMapping("/numbers/ping")
    public Map<String, String> ping() {
        Map<String, String> pong = new HashMap<>();
        pong.put("pong", "Hello, World!");
        return pong;
    }

    @GetMapping("/numbers")
    public Pick3PlaysResponse getNumbers(@RequestParam("winNumber") Integer winNumber,
                                         @RequestParam("winDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate winDrawDate,
                                         @RequestParam("futureDrawDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate futureDrawDate,
                                         @RequestParam("winDrawTime") DrawingTime winDrawTime,
                                         @RequestParam("futureDrawTime") DrawingTime futureDrawTime) {
        LOGGER.info("******** Inside getNumbers() method.");
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
