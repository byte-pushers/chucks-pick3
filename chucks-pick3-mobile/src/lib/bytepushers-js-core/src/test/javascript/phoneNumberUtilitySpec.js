define(['bytepushers', 'bytepushersPhoneNumberUtility'], function(BytePushers) {
    describe("bytepushers tests", function() {
        it('should defined BytePushers.PhoneNumberUtility', function() {
            expect(BytePushers.PhoneNumberUtility).toBeDefined();
        });

        it("format phone number", function(){
            var actualValue = {value: "2143484321"};
            var expectedValue = {value: "(214) 348-4321"};
            expect({value: BytePushers.PhoneNumberUtility.formatPhoneNumber(actualValue)}).toEqual(expectedValue);
        });
    });
});
