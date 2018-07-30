package software.bytepushers.pick3.model;

import software.bytepushers.pick3.api.DrawingTime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public enum TexasDrawingTime implements DrawingTime {
    MORNING {
        @Override
        public String toUserString() {
            return "Morning";
        }

        @Override
        public Date getTimeOfDay() {
            return MORNING_TIME;
        }
    },
    DAY {
        @Override
        public String toUserString() {
            return "Day";
        }

        @Override
        public Date getTimeOfDay() {
            return DAY_TIME;
        }
    },
    EVENING {
        @Override
        public String toUserString() {
            return "Evening";
        }

        @Override
        public Date getTimeOfDay() {
            return EVENING_TIME;
        }
    },
    NIGHT {
        @Override
        public String toUserString() {
            return "Night";
        }

        @Override
        public Date getTimeOfDay() {
            return NIGHT_TIME;
        }
    };

    static final Date DAY_TIME, NIGHT_TIME, EVENING_TIME, MORNING_TIME;

    static {
        SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
        try {
            MORNING_TIME = formatter.parse("10:00");
            DAY_TIME = formatter.parse("12:27");
            EVENING_TIME = formatter.parse("18:00");
            NIGHT_TIME = formatter.parse("22:12");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
}
