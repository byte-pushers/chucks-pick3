/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
var BytePushers = require('../../main/javascript'),
    assert = require('assert'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    fixturePath = "src/test/javascript/fixtures/html/";

describe("TexasPick3WebScraper Unit Tests", function() {
    it("should be able to find morning winning Number for a specific date", function () {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            expectedMorningWinningNumber = 158,
            actualMorningWinningNumber,
            actualDrawDate = new Date("02/15/2018"),
            actualDrawingTime = "Morning",
            scraper;

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: cheerio.load(html),
            drawingDate: actualDrawDate,
            drawingTime: actualDrawingTime
        });

        actualMorningWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualMorningWinningNumber, expectedMorningWinningNumber);
    });
    it("should be able to find Day Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedDayWinningNumber = 284,
            actualDrawingTime = "Day",
            actualDayWinningNumber,
            scraper;

        $ = cheerio.load(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: $
        });

        actualDayWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualDayWinningNumber, expectedDayWinningNumber);
    });
    it("should be able to find Evening Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedEveningWinningNumber = 230,
            actualDrawingTime = "Evening",
            actualEveningWinningNumber,
            scraper;

        $ = cheerio.load(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: $
        });

        actualEveningWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualEveningWinningNumber, expectedEveningWinningNumber);
    });
    it("should be able to find Night Winning Number for a specific date", function() {
        var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
            actualDrawDate = "02/14/2018",
            expectedNightWinningNumber = 129,
            actualDrawingTime = "Night",
            actualNightWinningNumber,
            scraper;

        $ = cheerio.load(html);

        scraper = new BytePushers.TexasPick3WebScraper({
            url: BytePushers.TexasPick3WebScraper.URL,
            cheerio: $
        });

        actualNightWinningNumber = scraper.findWinningNumber(actualDrawDate, actualDrawingTime);

        assert.equal(actualNightWinningNumber, expectedNightWinningNumber);
    });
});