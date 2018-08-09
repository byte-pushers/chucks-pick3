/**
 * Created by tonte on 2/15/18.
 */
/*global expect, jasmine, define, describe, beforeAll, it*/
//define(['cheerio'], function (cheerio) {
    var assert = require('assert'),
        cheerio = require('cheerio'),
        fs = require('fs'),
        fixturePath = "src/test/javascript/fixtures/html/",
        $;

    function removeNewLine2(someText) {
        var bytes = []; // char codes

        for (var i = 0; i < someText.length; ++i) {
            var code = someText.charCodeAt(i);

            bytes = bytes.concat([code]);
        }

        for (var i = 0; i < bytes.length; i++) {
            if (bytes[i] === 92 && bytes[i+1] === 110) {
                bytes.splice(i, 2);
            }
        }

        someText = convertBinaryArrayToString(bytes);

        return someText.trim();
    }

    function convertBinaryArrayToString(bytes) {
        var result = "";

        for (var i = 0; i < bytes.length; i++) {
            result += String.fromCharCode(bytes[i]);
        }

        return result;
    }

    function scrapeMorningWinningNumber($section) {
        var num1 = $section.find("td:nth-child(2)").text(),
            num2 = $section.find("td:nth-child(3)").text(),
            num3 = $section.find("td:nth-child(4)").text();

        num1 = removeNewLine2(num1).trim();
        num2 = removeNewLine2(num2).trim();
        num3 = removeNewLine2(num3).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeDrawDateTdElement(drawingDate) {
        var $drawDateTdElement = $('#pastResults').find('tr > td:first-child:contains('+drawingDate+')');

        return $drawDateTdElement;
    }

    function scrapeDrawDateTrElement($targetTdElement) {
        var $drawDateTrElement = $targetTdElement.parent();

        return $drawDateTrElement;
    }

    function findMorningWinningNumber(drawingDate) {
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement),
            winningNumber = scrapeMorningWinningNumber($targetTrElement);

        return winningNumber;
    }

    describe("Cheerio tests", function() {
        it("should be able to find morning winning Number for a specific date", function () {
            var html = fs.readFileSync(fixturePath + "pick3-morning-drawing-fixture.html", "UTF-8"),
                expectedDate = "02/15/2018",
                expectedMorningWinningNumber = 158,
                actualMorningWinningNumber;

            $ = cheerio.load(html);
            actualMorningWinningNumber = findMorningWinningNumber(expectedDate);

            assert.equal(actualMorningWinningNumber, expectedMorningWinningNumber);
        });
    });


//});