/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');
var DrawingTimeNotFoundException = require('./software.bytepushers.pick3.lottery.web.exceptions.DrawingTimeNotFoundException');

function WebScraper(txPick3WebScraperConfig) {
    'use strict';
    
    WebScraper.prototype.superclass.apply(this, [txPick3WebScraperConfig]);
    this.drawingDate = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingDate)? txPick3WebScraperConfig.drawingDate : null;
    this.drawingTime = (txPick3WebScraperConfig && txPick3WebScraperConfig.drawingTime)? txPick3WebScraperConfig.drawingTime : null;
    this.drawingNumber = -1;

    function pad(n) {
        return n < 10 ? '0' + n : n;
    }

    this.getDrawingDate = function () {
        return this.drawingDate;
    };

    this.getDrawingTime = function () {
        return this.drawingTime;
    };

    this.getDrawingNumber = function () {
        return this.drawingNumber;
    };

    this.getActualMorningDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualDayDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualEveningDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getActualNightDrawingTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getNextDrawingDrawingTime = function (currentDate) {
        if (currentDate instanceof Date) {
            if (currentDate <= this.getActualMorningDrawingTime()) {
                return WebScraper.DRAWING_TIMES.MORNING;
            } else if (currentDate <= this.getActualDayDrawingTime()) {
                return WebScraper.DRAWING_TIMES.DAY;
            } else if (currentDate <= this.getActualEveningDrawingTime()) {
                return WebScraper.DRAWING_TIMES.EVENING;
            } else if (currentDate <= this.getActualNightDrawingTime()) {
                return WebScraper.DRAWING_TIMES.NIGHT;
            } else {
                return WebScraper.DRAWING_TIMES.TOMORROW_MORNING;
            }
        }

        throw new Error("parameter.must.be.a.date");
    };

    this.findMorningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findDayWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findEveningWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findNightWinningNumber = function () {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnMorningWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnDayWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnEveningWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawnNightWinningNumber = function (drawingDate, drawingTime) {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getMorningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getDayPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getEveningPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.getNightPostTime = function() {
        throw new Error("method not implemented by WebScraper " + this.constructor.name);
    };

    this.findLastDrawingWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = this.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);

            throw new Error("Problem occurred while trying to format date: " + drawingDate);
        }

        switch (drawingTime.toUpperCase()) {
            case WebScraper.DRAWING_TIMES.MORNING.name:
                winningNumber = this.findLastDrawnMorningWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.DAY.name:
                winningNumber = this.findLastDrawnDayWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.EVENING.name:
                winningNumber = this.findLastDrawnEveningWinningNumber(formattedDrawingDate, drawingTime);
                break;
            case WebScraper.DRAWING_TIMES.NIGHT.name:
                winningNumber = this.findLastDrawnNightWinningNumber(formattedDrawingDate, drawingTime);
                break;
            default:
                throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
        }

        return winningNumber;
    };

    this.findPastWinningNumber = function (drawingDate, drawingTime) {
        var winningNumber = 0,
            formattedDrawingDate = this.formatDate(drawingDate);

        if (formattedDrawingDate === undefined || formattedDrawingDate === null) {
            console.error("Problem occurred while trying to format date: " + drawingDate, drawingDate);

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
                throw new DrawingTimeNotFoundException(drawingTime, drawingDate);
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
    },
    'TOMORROW_MORNING': {
        value: 'Tomorrow Morning',
        description: "Pick 3 Lottery drawing time for tomorrow morning drawing."
    }
});

WebScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
WebScraper.prototype.constructor = WebScraper;
WebScraper.prototype.superclass = BaseWebScraper;

module.exports = WebScraper;
