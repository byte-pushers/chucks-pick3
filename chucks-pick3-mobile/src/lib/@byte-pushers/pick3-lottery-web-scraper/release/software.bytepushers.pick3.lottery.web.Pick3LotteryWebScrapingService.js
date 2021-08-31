/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

/**
 * Created by tonte on 10/4/17.
 */
// var request = require('request');
// var cheerio = require('cheerio');

var TexasPick3Lottery = require('./software.bytepushers.pick3.lottery.web.TexasPick3Lottery');

function Pick3LotteryWebScrapingService(webScraperBaseUrl) {
    'use strict';
    var registeredPick3Lotteries = [
        {
            state: "TX",
            stateName: "Texas",
            stateLottery: new TexasPick3Lottery(webScraperBaseUrl)
        }
    ];

    function findRegisteredPick3Lottery (drawingState) {
        var registeredPick3Lottery = registeredPick3Lotteries.find(function (registeredScraper) {
            return (drawingState && registeredScraper.state.toUpperCase() === drawingState.toUpperCase());
        });

        if (registeredPick3Lottery === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + drawingState);
        }

        return registeredPick3Lottery.stateLottery;
    }

    this.findRegisteredStateLottery = function (drawingState) {
        return findRegisteredPick3Lottery(drawingState);
    };

    /*this.retrievePastWinningNumber = function (drawingState, drawingDate, drawingTime, request, pageReader) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState, drawingDate, drawingTime);
        return registeredPick3Lottery.pick3Lottery.retrievePastWinningNumber(drawingState, drawingDate, drawingTime, request, pageReader);
    };*/

    /*this.getActualMorningDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualMorningDrawingTime();
    };

    this.getActualDayDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualDayDrawingTime();
    };

    this.getActualEveningDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualEveningDrawingTime();
    };

    this.getActualNightDrawingTime = function(drawingState) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);

        return registeredPick3Lottery.pick3Lottery.getActualNightDrawingTime();
    };*/

    /*this.getCurrentDrawingTime = function (drawingState, currentTime) {
        var registeredPick3Lottery = findRegisteredPick3Lottery(drawingState);
        var drawingTime = registeredPick3Lottery.getDrawingTime(currentTime);
        return drawingTime;
    };*/

}

module.exports = Pick3LotteryWebScrapingService;
