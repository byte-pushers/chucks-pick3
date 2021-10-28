define(['bytepushers', 'bytepushersResourceLoader'], function(BytePushers) {
    describe("bytepushersResoureLoader tests", function() {
        it('should defined bytepushersResoureLoader', function() {
            expect(BytePushers.loadXMLDoc).toBeDefined();
            expect(BytePushers.createResource).toBeDefined();
            expect(BytePushers.loadResource).toBeDefined();
            expect(BytePushers.removeResource).toBeDefined();
        });

        it("undefined", function(){
            BytePushers.loadResource("../test.js", "js");
        });
    });
});