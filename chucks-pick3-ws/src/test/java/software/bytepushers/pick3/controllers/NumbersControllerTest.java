package software.bytepushers.pick3.controllers;

import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.mockito.stubbing.Answer;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.api.v1.Pick3PlaysResponse;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.domain.Pick3Plays;
import software.bytepushers.pick3.services.Pick3PlaysService;
import software.bytepushers.pick3.util.Answers;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


public class NumbersControllerTest {

    Pick3PlaysService playsService;
    Pick3PlaysMapper playsMapper;

    static Answer<Pick3Plays> withGenericPlay;

    static Answer<Pick3PlaysResponse> withGenericPlayResponse;

    NumbersController numbersController;

    @BeforeClass
    public static void beforeClass() {
        withGenericPlay = Answers.genericPick3Plays();
        withGenericPlayResponse = Answers.genericPick3PlaysResponse();
    }

    @Before
    public void before() {
        playsService = mock(Pick3PlaysService.class);
        playsMapper = mock(Pick3PlaysMapper.class);

        numbersController = new NumbersController(playsService, playsMapper);
    }

    @Test
    public void testGetNumbersCallsMocksOnce() throws Exception {
        answerWithGenericPlays();

        numbersController.getNumbers(123, LocalDate.now(), LocalDate.now(), DrawingTime.DAY, DrawingTime.NIGHT);

        verify(playsService).getPick3Plays(anyInt(), any(), any(), any(), any());
        verify(playsMapper).pick3PlaysToPick3PlaysResponse(any());
    }

    @Test
    public void testGetNumbersPassesServiceResultToMapper() throws Exception {
        answerWithGenericPlays();

        LocalDate winDate = LocalDate.now();
        LocalDate playDate = LocalDate.now();

        Pick3PlaysResponse response =
                numbersController.getNumbers(123, winDate, playDate, DrawingTime.DAY, DrawingTime.NIGHT);

        assertThat(response.getDate()).isEqualTo(playDate.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        assertThat(response.getDrawingTime()).isEqualTo(DrawingTime.NIGHT.toString());
        assertThat(response.getPlays()).containsExactly(123, 234, 345);
    }

    private void answerWithGenericPlays() {
        when(playsService.getPick3Plays(anyInt(), any(), any(), any(), any())).thenAnswer(withGenericPlay);
        when(playsMapper.pick3PlaysToPick3PlaysResponse(any())).thenAnswer(withGenericPlayResponse);
    }
}
