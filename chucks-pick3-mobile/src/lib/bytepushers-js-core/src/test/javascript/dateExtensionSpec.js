describe("Date extension tests:", function() {

    var dec31 = new Date(2015, 11, 31, 13, 4),
        dec31Again = new Date(2015, 11, 31, 15, 5),
        jan1 = new Date(2016, 0, 1),
        nov30 = new Date(2015, 10, 30),
        nov29 = new Date(2015, 10, 29),
        dec1 = new Date(2015, 11, 1);

    describe('Date.prototype.isDateEqualTo', function () {

        it('will return true if tests succeeds', function() {
            var result = dec31.isDateEqualTo(dec31Again);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = dec31.isDateEqualTo(jan1);

            expect(result).toBe(false);
        });
    });

    describe('Date.prototype.isDateEqualToDateAndTime', function () {

        it('will return true if tests succeeds', function() {
            var result = dec31.isDateEqualToDateAndTime(new Date(2015, 11, 31, 13, 4));

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = dec31.isDateEqualToDateAndTime(dec31Again);

            expect(result).toBe(false);
        });
    });

    describe('Date.prototype.isDateEqualToTomorrow', function () {

        it('will work if date is in next year', function() {
            var result = dec31.isDateEqualToTomorrow(jan1);

            expect(result).toBe(true);
        });

        it('will work if date is in next month', function() {
            var result = nov30.isDateEqualToTomorrow(dec1);

            expect(result).toBe(true);
        });

        it('will work if date is in same month', function() {
            var result = nov29.isDateEqualToTomorrow(nov30);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = dec31.isDateEqualToTomorrow(dec31Again);

            expect(result).toBe(false);
        });
    });

    describe('Date.prototype.isDateEqualToYesterday', function () {

        it('will work if date is in same month', function() {
            var result = nov30.isDateEqualToYesterday(nov29);

            expect(result).toBe(true);
        });

        it('will work if date is in last month', function() {
            var result = dec1.isDateEqualToYesterday(nov30);

            expect(result).toBe(true);
        });

        it('will work if date is in last year', function() {
            var result = jan1.isDateEqualToYesterday(dec31);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = dec31.isDateEqualToYesterday(dec31Again);

            expect(result).toBe(false);
        });
    });

    describe('Date.isLastDayInMonth', function () {

        it('will return true if tests succeeds for prototype', function() {
            var result = dec31.isLastDayInMonth();

            expect(result).toBe(true);
        });

        it('will return true if tests succeeds as a static method', function() {
            var result = Date.isLastDayInMonth(dec31);

            expect(result).toBe(true);
        });

        it('will return false if test fails', function() {
            var result = jan1.isLastDayInMonth();

            expect(result).toBe(false);
        });
    });

    describe('Date.prototype.getPreviousMonthTotalDays', function () {

        it('knows November has 30 days', function() {
            var result = dec31.getPreviousMonthTotalDays();

            expect(result).toBe(30);
        });

        it('knows December has 31 days', function() {
            var result = jan1.getPreviousMonthTotalDays();

            expect(result).toBe(31);
        });
    });

    describe('Date.prototype.getNextMonthTotalDays', function () {

        it('knows December has 31 days', function() {
            var result = nov29.getNextMonthTotalDays();

            expect(result).toBe(31);
        });

        it('knows January has 31 days', function() {
            var result = dec31.getNextMonthTotalDays();

            expect(result).toBe(31);
        });
    });

    /*'Date.getCurrentMonthTotalDays' is used in other methods already tested and is working correctly*/

    describe('Date.prototype.addTime', function () {

        var result;

        it('can add hours', function() {
            result = dec31.addTime(24);
            expect(result.getHours()).toBe(13);
        });

        it('can add negative hours', function() {
            result = dec31.addTime(-10);
            expect(result.getHours()).toBe(3);
        });
    });

    describe('Date.getMonthName', function () {

        it("knows a month's name", function() {
            var result = Date.getMonthName(dec31.getMonth());
            expect(result).toBe("December");
        });
    });
});
