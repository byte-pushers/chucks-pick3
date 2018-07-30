/*global Promise*/
/**
 * Created by tonte on 10/4/17.
 */
var request = require('request');
var cheerio = require('cheerio');

var TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

function Pick3LotteryWebScrapingService() {
    'use strict';
    //TODO: Create endpoint function

    this.retrieveWinningNumber = function (drawingState, drawingDate, drawingTime) {
        var registeredScraperConfig,
            scraper,
            winningNumberPromise,
            winningNumber = {
                date: drawingDate,
                time: drawingTime,
                number: 0
            };

        try {
            registeredScraperConfig = findRegisteredScraperConfiguration(drawingState, drawingDate, drawingTime);

            winningNumberPromise = new Promise(function (resolve, reject) {
                // Do async job
                doScrape(registeredScraperConfig.url, function (error, response, html) {
                    if (error) {
                        reject(error);
                    } else {
                        scraper = (registeredScraperConfig === undefined)? null : new registeredScraperConfig.Scraper({
                            url: registeredScraperConfig.url,
                            cheerio: cheerio.load(html),
                            drawingDate: drawingDate,
                            drawingTime: drawingTime
                        });
                        winningNumber.number = scraper.findWinningNumber(drawingDate, drawingTime);
                        resolve(winningNumber);
                    }
                });
            });
        } catch (e) {
            //TODO: Handle error
            winningNumberPromise = new Promise(function (resolve, reject) {
                //TODO: Handle error
                reject(e);
            });
        }

        return winningNumberPromise;
    };

    function doScrape(url, callback) {

        request(url, callback)
    }

    function findRegisteredScraperConfiguration(drawingState) {
        var registeredScraper = registeredScrapers.find(function (registeredScraper) {
            return (drawingState && registeredScraper.state.toUpperCase() === drawingState.toUpperCase());
        });

        if (registeredScraper === undefined) {
            throw new Error("Could not find registered scraper for specified state: " + drawingState);
        }

        return registeredScraper;
    }

    var registeredScrapers = [
        {state: "TX", stateName: "Texas", url: TexasPick3WebScraper.URL, Scraper: TexasPick3WebScraper}
    ]
}

module.exports = Pick3LotteryWebScrapingService;