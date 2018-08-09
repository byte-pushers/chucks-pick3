/**
 * Created by kalexmills on 7/20/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert');

describe("DrawingTimeInFutureException Unit Tests", function() {
    it("should return toString() messages as specified", function () {
        var nowIsoString = new Date().toISOString(),
            expectedMsg = "DrawingTimeInFutureException: the requested drawing time \"MORNING\" is in the future. Check back on 07/31/2018 after " + nowIsoString,
            exception = new BytePushers.DrawingTimeInFutureException("MORNING", "07/31/2018", new Date().toISOString()),
            actualMsg = exception.toString();

        assert.equal(expectedMsg, actualMsg);
    });
    it("should have the correct exception code set", function() {
        var exception = new BytePushers.DrawingTimeInFutureException("MORNING", "07/31/2018", new Date().toISOString());

        assert.equal(exception.code, BytePushers.Exception.Code.DRAWING_TIME_IN_FUTURE);
    });
});