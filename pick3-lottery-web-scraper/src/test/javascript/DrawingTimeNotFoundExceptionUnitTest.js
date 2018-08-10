/**
 * Created by kalexmills on 7/20/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert');

describe("DrawingTimeNotFoundException Unit Tests", function() {
    it("should return toString() messages as specified", function () {
        var expectedMsg = "DrawingTimeNotFoundException: the requested drawing time \"MORNING\" was not available for date 07/31/2018",
            exception = new BytePushers.DrawingTimeNotFoundException("MORNING", "07/31/2018"),
            actualMsg = exception.toString();

        assert.equal(expectedMsg, actualMsg);
    });
    it("should have the correct exception code set", function() {
        var exception = new BytePushers.DrawingTimeNotFoundException("MORNING", "07/31/2018");

        assert.equal(exception.code, BytePushers.Exception.Code.DRAWING_TIME_NOT_FOUND);
    });
});