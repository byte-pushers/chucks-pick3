/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');
var WinningNumberNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.WinningNumberNotFoundException');
var DrawingYearNotAvailableException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingYearNotAvailableException');

function TexasPick3WebScraper(TxPick3WebScraperConfig) {
    'use strict';

    TexasPick3WebScraper.prototype.superclass.apply(this, [TxPick3WebScraperConfig]);
    var $ = this.getPageReader(),
        self = this;

    function scrapeDrawDateTdElement(drawingDate) {
        var $drawDateTdElement = (Object.isFunction($.find)) ?
            $.find('tr > td:first-child:contains(' + drawingDate + ')') :
            $('tr > td:first-child:contains(' + drawingDate + ')');

        return $drawDateTdElement;
    }

    function scrapeDrawDateTrElement($targetTdElement) {
        var $drawDateTrElement = $targetTdElement.parent();

        return $drawDateTrElement;
    }

    function convertBinaryArrayToString(bytes) {
        var result = "",
            i = 0;

        for (i = 0; i < bytes.length; i += 1) {
            result += String.fromCharCode(bytes[i]);
        }

        return result;
    }
    function removeNewLineBytes(someText) {
        var bytes = [], // char codes
            code,
            i;

        for (i = 0; i < someText.length; i += 1) {
            code = someText.charCodeAt(i);

            bytes = bytes.concat([code]);
        }

        for (i = 0; i < bytes.length; i += 1) {
            if (bytes[i] === 92 && bytes[i+1] === 110) {
                bytes.splice(i, 2);
            }
        }

        someText = convertBinaryArrayToString(bytes);

        return someText.trim();
    }

    function trimForNumbersOnly(someText) {
        var bytes = [], // char codes
            code,
            i;

        for (i = 0; i < someText.length; i++) {
            code = someText.charCodeAt(i);
            bytes = bytes.concat([code]);
        }

        for (i = 0; i < bytes.length; i++) {
            if (bytes[i] !== 48 && bytes[i] !== 49 && bytes[i] !== 50 && bytes[i] !== 51 && bytes[i] !== 52 &&
                bytes[i] !== 53 && bytes[i] !== 54 && bytes[i] !== 55 && bytes[i] !== 56 && bytes[i] !== 57) {
                bytes.splice(i, 1);
                i = i - 1;
            }
        }

        someText = convertBinaryArrayToString(bytes);

        return someText.trim();
    }

    function parseTargetDrawDateSection($targetTrElement) {
        var tdElements = $targetTrElement.children('td'),
            result = { morningTdElements:[],
                dayTdElements: [],
                eveningTdElements: [],
                nightTdElements: []
            },
            columnCount = 0;

        // Iterate over the td elements and separate them into morning, day, evening, and night buckets
        // based on the column the element lies in.
        /**
         Old legacy html format here.  Since then they have simplied their html format.

         tdElements.each(function (ignore, $tdElement) {
            if ($tdElement.attribs && $tdElement.attribs.colspan) {
                columnCount += parseInt($tdElement.attribs.colspan);
            } else {
                columnCount += 1;
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
        });*/

        result.morningTdElements.push(tdElements[1]);
        result.dayTdElements.push(tdElements[3]);
        result.eveningTdElements.push(tdElements[5]);
        result.nightTdElements.push(tdElements[7]);

        return result;
    }

    function scrapeWinningNumber(parsedDrawDateSection) {
        var num1, num2, num3, winningNumber;

        if (parsedDrawDateSection.length === 3 || parsedDrawDateSection.length === 1) {
            num1 = (parsedDrawDateSection[0] &&
                parsedDrawDateSection[0].children[0] &&
                parsedDrawDateSection[0].children[0].data) ?
                trimForNumbersOnly(parsedDrawDateSection[0].children[0].data) : (parsedDrawDateSection[0] && parsedDrawDateSection[0].innerText) ? trimForNumbersOnly(parsedDrawDateSection[0].innerText) : null;


            if (num1.length === 1) {
                num2 = (parsedDrawDateSection[1] &&
                    parsedDrawDateSection[1].children[0] &&
                    parsedDrawDateSection[1].children[0].data) ?
                    trimForNumbersOnly(parsedDrawDateSection[1].children[0].data) : (parsedDrawDateSection[1] && parsedDrawDateSection[1].innerText) ? trimForNumbersOnly(parsedDrawDateSection[1].innerText) : null;
                num3 = (parsedDrawDateSection[2] &&
                    parsedDrawDateSection[2].children[0] &&
                    parsedDrawDateSection[2].children[0].data) ?
                    trimForNumbersOnly(parsedDrawDateSection[2].children[0].data) : (parsedDrawDateSection[2] && parsedDrawDateSection[2].innerText) ? trimForNumbersOnly(parsedDrawDateSection[2].innerText) : null;

                if (num1 && num2 && num3) {
                    winningNumber = 100 * num1 + 10 * num2 + 1 * num3;
                } else {
                    console.error("Could not convert number: num1: " + num1 + ", num2: " + num2 + ", num3: " + num3);
                    throw new WinningNumberNotFoundException(num1, num2, num3);
                }
            } else if (num1.length === 3) {
                try {
                    winningNumber = parseInt(num1, 10);
                } catch(e) {
                    console.error("Could not convert number: num1:" + num1 + " into a number.");
                    throw new WinningNumberNotFoundException(num1, num2, num3);
                }
            }
        } else {
            throw new DrawingTimeNotFoundException(self.getDrawingTime(), self.getDrawingDate());
        }

        return winningNumber;
    }

    function findTargetDrawDateSection(drawingDate){
        var $targetTdElement = scrapeDrawDateTdElement(drawingDate),
            $targetTrElement = null;

        if ($targetTdElement.length > 0) {
            $targetTrElement = scrapeDrawDateTrElement($targetTdElement);
        } else {
            throw new DrawingYearNotAvailableException(drawingDate);
        }

        return $targetTrElement;
    }

    function getElementData (element) {
        var data = null;

        if (element && element.children && element.children[0] && element.children[0].innerText) {
            data = element.children[0].innerText.trim();
        } else if (element && element.children && element.children.length == 3 && element.children[1].children && element.children[1].children[0] && element.children[1].children[0].data) {
            data = element.children[1].children[0].data.trim();
        } else if (element && element.children && element.children[0] && element.children[0].children && element.children[0].children.length == 1) {
            data = element.children[0].children[0].data.trim();
        }

        return data;
    }

    this.findMorningWinningNumber = function (drawingDate) {
        var $targetDrawDateSection = findTargetDrawDateSection(drawingDate),
            parsedDrawDateSection = parseTargetDrawDateSection($targetDrawDateSection),
            winningNumber = scrapeWinningNumber(parsedDrawDateSection.morningTdElements);

        return winningNumber;
    };

    this.findLastDrawnMorningWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnDayWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnEveningWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };


    this.findLastDrawnNightWinningNumber = function (drawingDate, drawingTime) {
        return this.findLastDrawnWinningNumber(drawingDate, drawingTime);
    };

    this.findLastDrawnWinningNumber = function (drawingDate, drawingTime) {
        var lastDrawnWinningNumber = 0,
            digits = [],
            $drawDateDivElement = (Object.isFunction($.find)) ?
                $.find('div.large-6.cell > div.homePageCell:contains(' + drawingDate + ' ' + drawingTime + ')') :
                $('div.large-6.cell > div.homePageCell:contains(' + drawingDate + ' ' + drawingTime + ')');

        if ($drawDateDivElement === null || $drawDateDivElement === undefined || $drawDateDivElement.length == 0) {
            throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        if ($drawDateDivElement !== null && $drawDateDivElement !== undefined) {
            var $lastDrawWinningNumberLiElement = $drawDateDivElement.find('ol.winningNumberBalls > li:not(:contains(FIREBALL))');
            $lastDrawWinningNumberLiElement.each(function(index, element) {
                var data = getElementData(element);
                digits.push(data);

                if (data !== null && data !== undefined) {
                    if (index == 0){
                        lastDrawnWinningNumber = data * 100;
                    } else if (index == 1) {
                        lastDrawnWinningNumber = lastDrawnWinningNumber + (data * 10);
                    } else if (index === 2) {
                        lastDrawnWinningNumber = lastDrawnWinningNumber + (data * 1);
                    }
                }
            });
        }

        var throwWinningNumberNotFoundException = digits.some(function (digit) {
            return (digit === null || digit === undefined || digit === "");
        });

        if (throwWinningNumberNotFoundException) {
            throw new WinningNumberNotFoundException(digits[0], digits[1], digits[2]);
        }

        return lastDrawnWinningNumber;
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
}

TexasPick3WebScraper.prototype = BytePushers.inherit(WebScraper.prototype);
TexasPick3WebScraper.prototype.constructor = TexasPick3WebScraper;
TexasPick3WebScraper.prototype.superclass = WebScraper;

module.exports = TexasPick3WebScraper;
