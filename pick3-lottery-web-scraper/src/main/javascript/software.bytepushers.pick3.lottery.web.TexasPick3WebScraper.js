
var BytePushers = require('bytepushers-js-oop');
var WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');

function TexasPick3WebScraper(TxPick3WebScraperConfig) {
    'use strict';
    TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
    var $ = this.getCheerio();

    function findTargetDrawDateSection(drawingDate){
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement);

        return $targetTrElement;
    }

    this.findMorningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            winningNumber = scrapeMorningWinningNumber($targetDrawDateSection);

        return winningNumber;
    };

    this.findDayWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            winningNumber = scrapeDayWinningNumber($targetDrawDateSection);

        return winningNumber;
    };

    this.findEveningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            winningNumber = scrapeEveningWinningNumber($targetDrawDateSection);

        return winningNumber;
    };

    this.findNightWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            winningNumber = scrapeNightWinningNumber($targetDrawDateSection);

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

    function scrapeMorningWinningNumber($section) {
        var num1 = $section.find("td:nth-child(2)").text(),
            num2 = $section.find("td:nth-child(3)").text(),
            num3 = $section.find("td:nth-child(4)").text();

        num1 = removeNewLineBytes(num1).trim();
        num2 = removeNewLineBytes(num2).trim();
        num3 = removeNewLineBytes(num3).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeDayWinningNumber($section) {
        var num1 = $section.find("td:nth-child(6)").text(),
            num2 = $section.find("td:nth-child(7)").text(),
            num3 = $section.find("td:nth-child(8)").text();

        num1 = removeNewLineBytes(num1).trim();
        num2 = removeNewLineBytes(num2).trim();
        num3 = removeNewLineBytes(num3).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeEveningWinningNumber($section) {
        var num1 = $section.find("td:nth-child(10)").text(),
            num2 = $section.find("td:nth-child(11)").text(),
            num3 = $section.find("td:nth-child(12)").text();

        num1 = removeNewLineBytes(num1).trim();
        num2 = removeNewLineBytes(num2).trim();
        num3 = removeNewLineBytes(num3).trim();

        return 100 * num1 + 10 * num2 + 1 * num3;
    }

    function scrapeNightWinningNumber($section) {
        var num1 = $section.find("td:nth-child(14)").text(),
            num2 = $section.find("td:nth-child(15)").text(),
            num3 = $section.find("td:nth-child(16)").text();

        num1 = removeNewLineBytes(num1).trim();
        num2 = removeNewLineBytes(num2).trim();
        num3 = removeNewLineBytes(num3).trim();

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
}

TexasPick3WebScraper.prototype = BytePushers.inherit(WebScraper.prototype);
TexasPick3WebScraper.prototype.constructor = TexasPick3WebScraper;
TexasPick3WebScraper.prototype.superclass = WebScraper;

TexasPick3WebScraper.URL = "http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html";

module.exports = TexasPick3WebScraper;