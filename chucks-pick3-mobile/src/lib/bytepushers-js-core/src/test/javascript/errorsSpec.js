define(['bytepushers', 'bytepushersErrors'], function (BytePushers) {
    describe("bytepushers errors tests", function() {
        it("should define bytepusher.exceptions", function() {
            expect(BytePushers.exceptions).toBeDefined();
        });

        it("should throw an exception", function() {
            function testError() {
                throw new BytePushers.exceptions.InvalidParameterException();
            }
            expect(function(){testError()}).toThrow();
        });
    });


});