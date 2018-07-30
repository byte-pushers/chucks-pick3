package software.bytepushers.pick3.api;

import java.util.Date;

/**
 * Represents a single drawing of the Pick 3 Lottery.
 */
public interface Drawing<T extends DrawingTime> {
    /**
     * @return the digits of the drawing, packed into a single integer, with digit 1 in the 100s place,
     * digit 2 in the 10s place, and digit 3 in the 1s place.
     */
    default int getDigits() {
        return 100 * getDigit1() + 10 * getDigit2() + getDigit3();
    }

    /**
     * @return int the first digit of the drawing. Typically 0-9.
     */
    int getDigit1();
    /**
     * @return int the second digit of the drawing. Typically 0-9.
     */
    int getDigit2();
    /**
     * @return int the third digit of the drawing. Typically 0-9.
     */
    int getDigit3();
    /**
     * @param digit int the first digit of the drawing. Typically 0-9.
     */
    void setDigit1(int digit);
    /**
     * @param digit int the second digit of the drawing. Typically 0-9.
     */
    void setDigit2(int digit);
    /**
     * @param digit int the third digit of the drawing. Typically 0-9.
     */
    void setDigit3(int digit);

    /**
     * @return DrawingTime the time of day at which the drawing typically occurs.
     */
    T getDrawingTime();
    /**
     * @param time DrawingTime the time of day at which the drawing typically occurs.
     */
    void setDrawingTime(T time);

    /**
     * @return Date the year month and day of this drawing.
     */
    Date getDrawingDate();
    /**
     * @param date Date the year month and day of this drawing.
     */
    void setDrawingDate(Date date);

    /**
     * @return boolean true if the numbers represented by this drawing were winning numbers.
     */
    boolean isWinner();
    /**
     * @param winner boolean true if the numbers represented by this drawing are winning numbers.
     */
    void setWinner(boolean winner);
}
