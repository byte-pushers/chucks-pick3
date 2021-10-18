define(['bytepushers', 'bytepushersFiltersProperty'], function (BytePushers) {
    describe("bytepushers date filter tests", function() {

      //began writing filter tests and really need to finish filters period

        it("should define BytePushers.filters.GenericProptertyFilter", function() {
            expect(BytePushers.filters.GenericProptertyFilter).toBeDefined();
        });

        it("should filter date based on property", function() {
            var date1 = new Date(),
                date2 = new Date('11/17/2000'),
                date3 = new Date('05/20/1990'),
                array = [{date: date1}, {date: date2}, {date: date3}];

            expect(BytePushers.filters.GenericProptertyFilter.DatePropteryFilter(array, date3, 'date')[0].date).toEqual(date3);
        });

        it("should filter name based on property", function() {
            var array = [{name: 'jared'}, {name: 'tonte'}, {name: 'maxwell'}];
            expect(BytePushers.filters.GenericProptertyFilter.StringPropteryFilter(array, 'maxwell', 'name')[0].name).toEqual('maxwell');
        });
    });
});
