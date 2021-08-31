/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */
/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');

function UrlScraper(urlScraperConfig) {
    'use strict';
    
    UrlScraper.prototype.superclass.apply(this, [urlScraperConfig]);
    var drawingDate = (urlScraperConfig && urlScraperConfig.drawingDate) ? urlScraperConfig.drawingDate : null;

    this.getDrawingDate = function() {
        return drawingDate;
    };

    this.scrapeUrlForYear = function(targetDate) {
        throw new Error("method not implemented by UrlScraper " + this.constructor.name);
    };

    this.findDrawingUrlForYear = function(drawingDate) {
        var targetUrl = this.scrapeUrlForYear(drawingDate);

        return targetUrl;
    };
}

UrlScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
UrlScraper.prototype.constructor = UrlScraper;
UrlScraper.prototype.superclass = BaseWebScraper;

module.exports = UrlScraper;
