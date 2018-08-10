/**
 * Created by kalexmills on 7/20/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert');

describe("DrawingYearNotAvailableException Unit Tests", function() {
    it("should return toString() messages as specified", function () {
        var expectedMsg = "DrawingYearNotAvailableException: data is not available for the requested drawing year \"2018\".",
            exception = new BytePushers.DrawingYearNotAvailableException("2018"),
            actualMsg = exception.toString();

        assert.equal(expectedMsg, actualMsg);
    });
    it("should have the correct exception code set", function() {
        var exception = new BytePushers.DrawingYearNotAvailableException("2018");

        assert.equal(exception.code, BytePushers.Exception.Code.DRAWING_YEAR_NOT_AVAILABLE);
    });
});