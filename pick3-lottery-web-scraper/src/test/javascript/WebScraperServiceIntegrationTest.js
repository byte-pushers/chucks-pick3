/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    fs = require('fs'),
    fixturePath = "src/test/javascript/fixtures/html/";

describe("WebScraperService Integration Tests", function() {
    it("should be able to scrape Texas Pick3 Lottery website and return winning number for a specific date", function () {
        var actualDrawingStateAbbreviation = "TX",
            actualDrawingTime = "Morning",
            actualDrawingDate = new Date("02/15/2018"),
            expectedMorningWinningNumber = 158,
            service;

        service = new BytePushers.Pick3LotteryWebScrapingService();

        return service.retrieveWinningNumber(actualDrawingStateAbbreviation, actualDrawingDate, actualDrawingTime).then(function(actualMorningWinningNumber) {
            assert.equal(actualMorningWinningNumber.number, expectedMorningWinningNumber);
        });
    });
});