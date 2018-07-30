/*global require, module*/

var BytePushers = {};
BytePushers.opp = require('bytepushers-js-oop');
BytePushers.Pick3LotteryWebScrapingService = require('./software.bytepushers.pick3.lottery.web.Pick3LotteryWebScrapingService');
BytePushers.WebScraper = require('./software.bytepushers.pick3.lottery.web.WebScraper');
BytePushers.TexasPick3WebScraper = require('./software.bytepushers.pick3.lottery.web.TexasPick3WebScraper');

module.exports = BytePushers;
module.exports.retrieveWinningNumber = function(event, context, callback) {
    var drawingState = (event && event.drawingState)? event.drawingState: null;
    var drawingDate = (event && event.drawingDate)? new Date(event.drawingDate): null;
    var drawingTime = (event && event.drawingTime)? event.drawingTime: null;
    var service = new BytePushers.Pick3LotteryWebScrapingService();

    if (drawingState && drawingDate && drawingTime) {
        return service.retrieveWinningNumber(drawingState, drawingDate, drawingTime).then(function (actualMorningWinningNumber) {
            var response = {
                statusCode: 200,
                body: JSON.stringify({
                    message: actualMorningWinningNumber,
                    input: event
                })
            };
            callback(null, response);
        }, function (error) {
            callback(error);
        });
    } else {
        callback("Required parameters must be defined.");
    }
};