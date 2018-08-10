var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');

function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    WebScraper.prototype.superclass.apply(this, [txPick3WebScraperConfig]);
    var drawingDate = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingDate)? txPick3WebScraperConfig.drawingDate: null;
    var drawingTime = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingTime)? txPick3WebScraperConfig.drawingTime: null;
    var drawingNumber = -1;

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    this.getDrawingDate = function () {
        return drawingDate;
    };

    this.getDrawingTime = function () {
        return drawingTime;
    };

    this.getDrawingNumber = function () {
        return drawingNumber;
    };

    this.findMorningWinningNumber = function (drawingDate) {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findDayWinningNumber = function (drawingDate) {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findEveningWinningNumber = function (drawingDate) {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findNightWinningNumber = function (drawingDate) {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getMorningPostTime = function() {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getDayPostTime = function() {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getEveningPostTime = function() {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getNightPostTime = function() {
        throw Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = this.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);
            //TODO: Use specific Error for date formatting issues.
            throw new Error("Problem occurred while trying to format date: " + drawingDate);
        }

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = this.findMorningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = this.findDayWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = this.findEveningWinningNumber(formattedDrawingDate);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = this.findNightWinningNumber(formattedDrawingDate);
                break;
            default:
                //TODO: Use specific Error for Drawing Times not supported.
                throw new Error("WebScraper.DRAWING_TIMES("+drawingTime+") is not supported.");
        }

        return winningNumber;
    };

    this.formatDate = function(targetDate) {
        var formattedTargetDate = null;

        if (targetDate instanceof Date) {
            formattedTargetDate = pad(targetDate.getMonth()+1) + "/" + pad(targetDate.getDate()) + "/" + targetDate.getFullYear();
        } else if (typeof targetDate === 'string' || targetDate instanceof String) {
            formattedTargetDate = targetDate;
        }

        return formattedTargetDate;
    };
}
WebScraper.DRAWING_TIMES = BytePushers.enumeration({
    'MORNING': {
        value: 'Morning',
        description: "Pick 3 Lottery drawing time for morning time drawing."
    },
    'DAY': {
        value: 'Day',
        description: "Pick 3 Lottery drawing time for mid-day time drawing."
    },
    'EVENING': {
        value: 'Evening',
        description: "Pick 3 Lottery drawing time for evening time drawing."
    },
    'NIGHT': {
        value: 'Night',
        description: "Pick 3 Lottery drawing time for night time drawing."
    }
});

WebScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
WebScraper.prototype.constructor = WebScraper;
WebScraper.prototype.superclass = BaseWebScraper;

module.exports = WebScraper;
