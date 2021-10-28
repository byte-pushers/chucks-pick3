define(['bytepushers', 'bytepushersDateConverter'], function(BytePushers) {
    describe("bytepushersDateConverter tests", function() {
        it('should defined BytePushers.converters.DateConverter', function() {
            expect(BytePushers.converters.DateConverter).toBeDefined();
        });

        it('should defined BytePushers.models.Month', function() {
            expect(BytePushers.models.Month).toBeDefined();
        });

        it("should convert to date MMDDYYYY", function(){
            var date = BytePushers.converters.DateConverter.convertToDate_MMDDYYYY("03301997");
            expect(date).toEqual(new Date(97,2,30));
        });

        it("should convert to date YYYYMMDD", function(){
            var date = BytePushers.converters.DateConverter.convertToDate_YYYYMMDD("19970330");
            expect(date).toEqual(new Date(97,2,30));
        });

        it('should convert date to string', function () {
          var dateString = '03/30/1997';
          var date = new Date(dateString);
          expect(BytePushers.converters.DateConverter.convertToString(date, 0, '/')).toEqual(dateString);
        });
    });
});
