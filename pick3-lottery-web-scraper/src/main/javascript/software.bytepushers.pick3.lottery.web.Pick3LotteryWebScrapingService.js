/*global Promise*/
/**
 * Created by tonte on 10/4/17.
 */
var request = require('request');
var cheerio = require('cheerio');

var TexasPick3UrlScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3UrlScraper');
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

            winningNumberPromise = new Promise(function(resolve, reject) {
                getWinningNumberSourcePath(drawingState, drawingDate)
                    .then(function(successResult) {
                        if (!successResult || successResult.url == null) {
                            // TODO: Handle error
                            reject("Could not find url in state " + drawingState + " for date " + drawingDate);
                        }
                        doScrape(successResult.url, function (error, response, html) {
                            if (error) {
                                reject(error);
                            } else {
                                scraper = (registeredScraperConfig === undefined)? null : new registeredScraperConfig.WebScraper({
                                    url: successResult.url,
                                    cheerio: cheerio.load(html),
                                    drawingDate: drawingDate,
                                    drawingTime: drawingTime
                                });
                                try {
                                    winningNumber.number = scraper.findWinningNumber(drawingDate, drawingTime);
                                } catch(error) {
                                    reject(error);
                                }
                                resolve(winningNumber);
                            }
                        });
                    }).catch(function(error) {
                        reject(error);
                    });
            });
        } catch (error) {
            //TODO: Handle error
            winningNumberPromise = new Promise(function (resolve, reject) {
                //TODO: Handle error
                reject(error);
            });
        }

        return winningNumberPromise;
    };

    function doScrape(url, callback) {

        request(url, callback)
    }

    function getWinningNumberSourcePath(drawingState, drawingDate) {
        var registeredUrlScraperConfig,
            scraper,
            winningNumberSourcePathPromise,
            sourcePath = {
                date: drawingDate,
                url: null
            };
        try {
            registeredUrlScraperConfig = findRegisteredScraperConfiguration(drawingState);

            winningNumberSourcePathPromise = new Promise(function (resolve, reject) {
                doScrape(registeredUrlScraperConfig.urlScraperUrl, function(error, response, html) {
                    if (error) {
                        reject(error);
                    } else {
                        scraper = (registeredUrlScraperConfig === undefined) ? null : new registeredUrlScraperConfig.UrlScraper({
                            url: registeredUrlScraperConfig.urlScraperUrl,
                            cheerio: cheerio.load(html),
                            drawingDate: drawingDate
                        });
                        try {
                            sourcePath.url = scraper.findSourcePath(drawingDate);
                        } catch (error) {
                            reject(error);
                        }
                        resolve(sourcePath);
                    }
                });
            });
        } catch (e) {
            // TODO: Handle error
            winningNumberSourcePathPromise = new Promise(function(resolve,reject) {
                // TODO: Handle error
               reject(e);
            });
        }
        return winningNumberSourcePathPromise;
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
        {state: "TX", stateName: "Texas", WebScraper: TexasPick3WebScraper,
         urlScraperUrl: TexasPick3UrlScraper.URL, UrlScraper: TexasPick3UrlScraper }
    ];
}

module.exports = Pick3LotteryWebScrapingService;