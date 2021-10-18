define(['bytepushers'], function(BytePushers) {
    describe("bytepushers tests", function() {
        it('should defined BytePushers module', function() {
            expect(BytePushers).toBeDefined();
        });

        it("should recognize an array", function(){
            var array = [1, 2, 3, 4];
            expect(BytePushers.isArrayLike(array)).toEqual(true);
        });

        it("should get properties from json objects", function(){
            var array = '{"type": "successful","value": "successful"}';
            expect(Object.getProperty(array, 'type')).toEqual('successful');
            var array2 = {foo: 'bar'};
            expect(Object.getProperty(array2, 'foo')).toEqual('bar');
        });

        /*
        todo: finish getting object.getproperty to work then publish it, and use it in the MessageHandler test in js-messaging project
        */
    });
});