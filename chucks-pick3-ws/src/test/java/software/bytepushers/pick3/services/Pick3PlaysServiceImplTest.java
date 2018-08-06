package software.bytepushers.pick3.services;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import software.bytepushers.pick3.api.v1.DrawingTime;
import software.bytepushers.pick3.config.Pick3PlaysConfig;

import java.util.Date;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@RunWith(MockitoJUnitRunner.class)
public class Pick3PlaysServiceImplTest {

    private Pick3PredictionService predictionService = mock(Pick3PredictionService.class);

    private Pick3PlaysConfig config = mock(Pick3PlaysConfig.class);

    private Pick3PlaysServiceImpl underTest;

    @Before
    public void before() {
        underTest = new Pick3PlaysServiceImpl(predictionService, config);
    }

    @Test
    public void testGetPick3PlaysCallsMocksAsExpected() {
        when(predictionService.predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt())).thenReturn(new int[][]{{0, 0, 0}});

        underTest.getPick3Plays(123, new Date(), DrawingTime.DAY, new Date(), DrawingTime.MORNING);

        verify(predictionService).predictPick3Plays(anyInt(), any(), any(), any(), any(), anyInt());
        verify(config).getNumPlaysToPredict();
    }
}
