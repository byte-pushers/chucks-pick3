package software.bytepushers.pick3.util;

import org.springframework.web.util.UriComponentsBuilder;

public class UrlUtils {
    public static String buildGetNumbersUrl(String winNumber, String winDate, String futureDrawDate, String winningDrawTime,
                                      String futureDrawTime) {
        return UriComponentsBuilder.fromPath("/numbers")
                .queryParam("winNumber", winNumber)
                .queryParam("winDrawDate", winDate)
                .queryParam("futureDrawDate", futureDrawDate)
                .queryParam("winDrawTime", winningDrawTime)
                .queryParam("futureDrawTime", futureDrawTime)
                .build()
                .toUriString();
    }
}
