package software.bytepushers.pick3.controllers;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import software.bytepushers.pick3.api.v1.mappers.Pick3PlaysMapper;
import software.bytepushers.pick3.config.DummyPredictionsConfig;
import software.bytepushers.pick3.config.SpringApiConfig;
import software.bytepushers.pick3.services.Pick3PlaysService;
import software.bytepushers.pick3.services.Pick3PredictionService;
import software.bytepushers.pick3.util.Answers;
import software.bytepushers.pick3.util.UrlUtils;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import static org.hamcrest.CoreMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes={SpringApiConfig.class, NumbersControllerIT.TestConfig.class})
@TestPropertySource("classpath:application.yml")
public class NumbersControllerIT {

    static Pick3PlaysService playsService;
    static Pick3PlaysMapper playsMapper;

    MockMvc mockMvc;

    @Autowired
    private WebApplicationContext wac;

    @Configuration
    public static class TestConfig {
        @Bean
        Pick3PredictionService pick3PredictionService() {
            Pick3PredictionService svc = mock(Pick3PredictionService.class);

            when(svc.generatePredictions(anyInt())).thenAnswer(Answers.randomWinningNumberResponse());

            return svc;
        }
    }

    @Before
    public void before() {
        mockMvc = MockMvcBuilders.webAppContextSetup(wac).build();
    }

    @Test
    public void testGetNumbersBasicRequests() throws Exception {
        String nowDate = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("123", nowDate, futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.date", is(futureDate)))
                .andExpect(jsonPath("$.drawingTime", is("DAY")))
                .andExpect(jsonPath("$.plays[*]").isArray())
                .andExpect(jsonPath("$.plays[*]").isNotEmpty())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testFutureDrawTimeMustBeAnEnumeratedValue() throws Exception {
        String pastDate = getDateOneDayInPast();

        String url = UrlUtils.buildGetNumbersUrl("123", getDateNow(), getDateNow(), "MORNING", "TEATIME");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testWinningDrawTimeMustBeAnEnumeratedValue() throws Exception {
        String pastDate = getDateOneDayInPast();

        String url = UrlUtils.buildGetNumbersUrl("123", getDateNow(), getDateNow(), "TEATIME", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testFutureDrawDateMustBeInFuture() throws Exception {
        String pastDate = getDateOneDayInPast();

        String url = UrlUtils.buildGetNumbersUrl("123", getDateNow(), pastDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testFutureDrawDateIsInProperDateFormat() throws Exception {
        String now = getDateNow();

        String url = UrlUtils.buildGetNumbersUrl("123", now, "04/03/99", "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testFutureDrawDateIsDate() throws Exception {
        String now = getDateNow();

        String url = UrlUtils.buildGetNumbersUrl("123", now, "asdf", "MORNING", "DAY");
        mockMvc.perform(get(url).accept(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testWinDrawDateMustBeInPast() throws Exception {
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("123", futureDate, futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testWinDrawDateIsInProperDateFormat() throws Exception {
        String now = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("123", "04/03/99", futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testWinDrawDateIsDate() throws Exception {
        String now = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("123", "asdf", futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetNumbersWinNumberGreaterThan1000IsBadRequest() throws Exception {
        String now = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("1000", now, futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetNumbersWinNumberNegativeNumberIsBadRequest() throws Exception {
        String now = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("-1", now, futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testGetNumbersWinNumberIsNumber() throws Exception {
        String now = getDateNow();
        String futureDate = getDateOneYearInFuture();

        String url = UrlUtils.buildGetNumbersUrl("asdf", now, futureDate, "MORNING", "DAY");
        mockMvc.perform(get(url))
                .andExpect(status().isBadRequest());
    }

    private String getDateOneDayInPast() {
        return LocalDate.now().minusDays(1).format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }

    private String getDateOneYearInFuture() {
        return new SimpleDateFormat("yyyy-MM-dd").format(new Date(new Date().getYear() + 1, 11, 12));
    }

    private String getDateNow() {
        return new SimpleDateFormat("yyyy-MM-dd").format(new Date());
    }

    

    private static void answerWithGenericPlays() {
        when(playsService.getPick3Plays(anyInt(), any(), any(), any(), any())).thenAnswer(Answers.genericPick3Plays());
        when(playsMapper.pick3PlaysToPick3PlaysResponse(any())).thenAnswer(Answers.genericPick3PlaysResponse());
    }
}
