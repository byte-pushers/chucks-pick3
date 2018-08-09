/**
 * Created by tonte on 10/4/17.
 */
/*global require*/

var cheerio = require("cheerio");
var request = require("request");

(function () {
    'use strict';
    var request = require('request');
    var cheerio = require('cheerio');
    var BytePushers = {};

    BytePushers.service.Scraper = BytePushers.namespace("software.service.Scraper");
    BytePushers.service.Scraper.doScrape = function (url, callback) {
        //url: http://www.txlottery.org/export/sites/lottery/Games/Pick_3/Winning_Numbers/print.html_8783066.html
        request(url, callback)
    };

    BytePushers.service.Scraper.scrapeTxPick3LotterySite = function (error, response, html) {
        if (!error) {
            var $ = cheerio.load(html),
                date,
                drawingTime,
                number;



        }
    };

}());

/*function scrapeTxPick3LotterySite = function (error, response, html) {
    if (!error) {
        var $ = cheerio.load(html,
            date,
            drawingTime,
            number;



    }
};

// index.js -> Bytepushers
module.exports = {
    scrapeTxPick3LotterySite: scrapeTxPick3LotterySite,



}*/
