
var BytePushers = require('bytepushers-js-oop');
var WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');

function TexasPick3WebScraper(TxPick3WebScraperConfig) {
    'use strict';
    TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
    var $ = this.getCheerio(),
        self = this;

    function findTargetDrawDateSection(drawingDate){
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement);

        return $targetTrElement;
    }

    this.findMorningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.morningTdElements);

        return winningNumber;
    };

    this.findDayWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.dayTdElements);

        return winningNumber;
    };

    this.findEveningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.eveningTdElements);

        return winningNumber;
    };

    this.findNightWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.nightTdElements);

        return winningNumber;
    };

    function removeNewLineBytes(someText) {
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

    function scrapeWinningNumber(parsedDrawDateSection) {
        var num1, num2, num3;

        if (parsedDrawDateSection.length != 3) {
            throw new DrawingTimeNotFoundException(self.getDrawingTime(), self.getDrawingDate());
        }

        num1 = removeNewLineBytes(parsedDrawDateSection[0].children[0].data).trim();
        num2 = removeNewLineBytes(parsedDrawDateSection[1].children[0].data).trim();
        num3 = removeNewLineBytes(parsedDrawDateSection[2].children[0].data).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeDrawDateTdElement(drawingDate) {
        var $drawDateTdElement = $('#pastresults').find('tr > td:first-child:contains('+drawingDate+')');

        return $drawDateTdElement;
    }

    function scrapeDrawDateTrElement($targetTdElement) {
        var $drawDateTrElement = $targetTdElement.parent();

        return $drawDateTrElement;
    }

    function parseTargetDrawDateSection($targetTrElement) {
        var tdElements = $targetTrElement.children('td'),
            result = { morningTdElements:[],
                       dayTdElements: [],
                       eveningTdElements: [],
                       nightTdElements: []},
            columnCount = 0;

        // Iterate over the td elements and separate them into morning, day, evening, and night buckets
        // based on the column the element lies in.
        tdElements.each((index, $tdElement) => {
            if ($tdElement.attribs['colspan']) {
                columnCount += parseInt($tdElement.attribs['colspan']);
            } else {
                columnCount++;
            }

            if (2 <= columnCount && columnCount <= 4) {
                result.morningTdElements.push($tdElement);
            } else if (6 <= columnCount && columnCount <= 8) {
                result.dayTdElements.push($tdElement);
            } else if (10 <= columnCount && columnCount <= 12) {
                result.eveningTdElements.push($tdElement);
            } else if (14 <= columnCount && columnCount <= 16) {
                result.nightTdElements.push($tdElement);
            }
        });

        return result;
    }
}

TexasPick3WebScraper.prototype = BytePushers.inherit(WebScraper.prototype);
TexasPick3WebScraper.prototype.constructor = TexasPick3WebScraper;
TexasPick3WebScraper.prototype.superclass = WebScraper;

TexasPick3WebScraper.URL = "http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html";

module.exports = TexasPick3WebScraper;