package software.bytepushers.pick3.services;

import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.junit.MockitoJUnitRunner;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.domain.Pick3Plays;
import software.bytepushers.pick3.services.impl.Pick3PlaysServiceImpl;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class Pick3PlaysServiceImplTest {

    @Mock
    private Pick3PredictionService predictionService;

    @InjectMocks
    private Pick3PlaysServiceImpl underTest;

    @Captor
    private ArgumentCaptor<Integer> integerCaptor;

    @Captor
    private ArgumentCaptor<LocalDate> dateCaptor;

    @Captor
    private ArgumentCaptor<DrawingTime> drawTimeCaptor;

    @Before
    public void before() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testGetPick3PlaysCallsMocksOnlyOnce() {
        when(predictionService.generatePredictions(anyInt())).thenReturn(new int[0][0]);

        underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        verify(predictionService).generatePredictions(anyInt());
    }

    @Test
    public void testGetPick3PlaysSetsReturnedDrawingTime() {
        when(predictionService.generatePredictions(anyInt()))
                .thenReturn(new int[][]{{0, 0, 0}, {1, 2, 3}, {0, 2, 3}, {0, 0, 1}, {9, 9, 9}});

        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        Assertions.assertThat(plays.getDrawingTime()).isEqualTo(DrawingTime.MORNING);
    }

    @Test
    public void testGetPick3PlaysSetsReturnedDrawingDate() {
        when(predictionService.generatePredictions(anyInt()))
                .thenReturn(new int[][]{{0, 0, 0}, {1, 2, 3}, {0, 2, 3}, {0, 0, 1}, {9, 9, 9}});

        LocalDate date = LocalDate.now();
        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, date, DrawingTime.MORNING);

        assertThat(plays.getDrawingDate()).isEqualTo(date);
    }

    @Test
    public void testGetPick3PlaysConvertsPlaysToPackedIntegers() {
        when(predictionService.generatePredictions(anyInt()))
                .thenReturn(new int[][]{{0, 0, 0}, {1, 2, 3}, {0, 2, 3}, {0, 0, 1}, {9, 9, 9}});

        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        assertThat(plays.getPlays()).containsExactly(0, 123, 23, 1, 999);
    }

    @Test
    public void testGetPick3PlaysPassesConfiguredNumPlaysToPredictionService() {
        when(predictionService.generatePredictions(anyInt())).thenReturn(new int[0][0]);

        underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        verify(predictionService).generatePredictions(anyInt());
    }

    @Test
    public void testGetPick3PlaysPassesArgumentsToPredictionService() {
        when(predictionService.generatePredictions(anyInt())).thenReturn(new int[0][0]);

        LocalDate date1 = LocalDate.now();
        LocalDate date2 = LocalDate.now().plusDays(3);
        underTest.getPick3Plays(123, date1, DrawingTime.DAY, date2, DrawingTime.MORNING);

        verify(predictionService).generatePredictions(integerCaptor.capture());


        assertThat(integerCaptor.getAllValues()).containsExactly(123);
    }
}
