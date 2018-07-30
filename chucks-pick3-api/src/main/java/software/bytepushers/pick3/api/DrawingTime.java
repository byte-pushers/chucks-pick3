package software.bytepushers.pick3.api;

import java.util.Date;

/**
 * Interface for an enum which represents a drawing time.
 */
public interface DrawingTime {

    /**
     * @return A user-friendly string representing this drawing time.
     */
    String toUserString();

    /**
     * @return Date a Date whose year, month, and day are all zero, representing the time of the day that
     *              this drawing is scheduled to occur.
     */
    Date getTimeOfDay();
}
