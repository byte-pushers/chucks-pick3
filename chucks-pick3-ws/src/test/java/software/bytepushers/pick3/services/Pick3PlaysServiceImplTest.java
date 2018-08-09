package software.bytepushers.pick3.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.junit.MockitoJUnitRunner;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.config.Pick3PlaysConfig;
import software.bytepushers.pick3.domain.Pick3Plays;

import java.time.LocalDate;
import java.util.Date;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class Pick3PlaysServiceImplTest {

    private Pick3PredictionService predictionService = mock(Pick3PredictionService.class);

    private Pick3PlaysConfig config = mock(Pick3PlaysConfig.class);

    private Pick3PlaysService underTest;

    @Captor private ArgumentCaptor<Integer> integerCaptor;

    @Captor private ArgumentCaptor<LocalDate> dateCaptor;

    @Captor private ArgumentCaptor<DrawingTime> drawTimeCaptor;

    @Before
    public void before() {
        underTest = new Pick3PlaysServiceImpl(predictionService, config);
    }

    @Test
    public void testGetPick3PlaysCallsMocksOnlyOnce() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[0][0]);

        underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        verify(predictionService).predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt());
        verify(config).getNumPlaysToPredict();
    }

    @Test
    public void testGetPick3PlaysSetsReturnedDrawingTime() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[][]{ {0, 0, 0}, {1,2,3}, {0,2,3}, {0,0,1}, {9,9,9} });

        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        assertThat(plays.getDrawingTime()).isEqualTo(DrawingTime.MORNING);
    }

    @Test
    public void testGetPick3PlaysSetsReturnedDrawingDate() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[][]{ {0, 0, 0}, {1,2,3}, {0,2,3}, {0,0,1}, {9,9,9} });

        LocalDate date = LocalDate.now();
        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, date, DrawingTime.MORNING);

        assertThat(plays.getDrawingDate()).isEqualTo(date);
    }

    @Test
    public void testGetPick3PlaysConvertsPlaysToPackedIntegers() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[][]{ {0, 0, 0}, {1,2,3}, {0,2,3}, {0,0,1}, {9,9,9} });

        Pick3Plays plays =
                underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        assertThat(plays.getPlays()).containsExactly(0, 123, 23, 1, 999);
    }

    @Test
    public void testGetPick3PlaysPassesConfiguredNumPlaysToPredictionService() {
        when(config.getNumPlaysToPredict()).thenReturn(42);
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[0][0]);

        underTest.getPick3Plays(123, LocalDate.now(), DrawingTime.DAY, LocalDate.now(), DrawingTime.MORNING);

        verify(predictionService).predictPick3Plays(anyInt(), any(), any(), any(), any(), integerCaptor.capture());

        assertThat(integerCaptor.getAllValues()).containsExactly(42);
    }

    @Test
    public void testGetPick3PlaysPassesArgumentsToPredictionService() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt()))
                .thenReturn(new int[0][0]);

        LocalDate date1 = LocalDate.now();
        LocalDate date2 = LocalDate.now().plusDays(3);
        underTest.getPick3Plays(123, date1, DrawingTime.DAY, date2, DrawingTime.MORNING);

        verify(predictionService).predictPick3Plays(integerCaptor.capture(), dateCaptor.capture(), drawTimeCaptor.capture(),
                dateCaptor.capture(), drawTimeCaptor.capture(), anyInt());


        assertThat(integerCaptor.getAllValues()).containsExactly(123);
        assertThat(dateCaptor.getAllValues()).containsExactly(date1, date2);
        assertThat(drawTimeCaptor.getAllValues()).containsExactly(DrawingTime.DAY, DrawingTime.MORNING);
    }
}
