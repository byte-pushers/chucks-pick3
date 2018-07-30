package software.bytepushers.pick3.model;

import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import software.bytepushers.pick3.api.Drawing;

import java.util.Date;

@Data
public class TexasDrawing implements Drawing<TexasDrawingTime> {

    // Store digits in single integer for slight efficiency gains.
    @Getter(AccessLevel.NONE)
    @Setter(AccessLevel.NONE)
    private int digits;

    private TexasDrawingTime drawingTime;
    private Date drawingDate;
    private boolean winner;

    public TexasDrawing(int digit1, int digit2, int digit3) {
        checkIsSingleDigitOrThrowException(digit1);
        checkIsSingleDigitOrThrowException(digit2);
        checkIsSingleDigitOrThrowException(digit3);

        this.digits = 100 * digit1 + 10 * digit2 + digit3;
    }

    public TexasDrawing(int digits) {
        if (digits < 0 || 999 < digits) throw new IllegalArgumentException("digits must be in range [0,999]");
        this.digits = digits;
    }

    @Override
    public int getDigit1() {
        return digits / 100;
    }

    @Override
    public int getDigit2() {
        return (digits % 100) / 10;
    }

    @Override
    public int getDigit3() {
        return digits % 10;
    }

    @Override
    public void setDigit1(int digit) {
        digits = 100 * digit + 10 * getDigit2() + getDigit3();
    }

    @Override
    public void setDigit2(int digit) {
        digits = 100 * getDigit1() + 10 * digit + getDigit3();
    }

    @Override
    public void setDigit3(int digit) {
        digits = 100 * getDigit1() + 10 * getDigit2() + digit;
    }

    private static void checkIsSingleDigitOrThrowException(int digit) {
        if (digit < 0 || 9 < digit) throw new IllegalArgumentException("digit must be in range [0,9]");
    }
}
