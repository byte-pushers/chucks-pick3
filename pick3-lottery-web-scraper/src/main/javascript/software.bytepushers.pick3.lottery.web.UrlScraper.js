/**
 * Created by kalexmills on 7/20/18.
 */
var BytePushers = require('bytepushers-js-oop');
var BaseWebScraper = require('./software.bytepushers.pick3.lottery.web.BaseWebScraper');

function UrlScraper(urlScraperConfig) {
    'use strict';
    UrlScraper.prototype.superclass.apply(this, [urlScraperConfig]);
    var drawingDate = (urlScraperConfig && urlScraperConfig.drawingDate) ? urlScraperConfig.drawingDate : null;

    var $ = this.getCheerio();

    this.getDrawingDate = function() {
        return drawingDate;
    }

    this.scrapeTargetUrl = function(targetDate) {
        throw Error("method not implemented by UrlScraper " + this.constructor.name);
    }

    this.findSourcePath = function(drawingDate) {
        var targetUrl = this.scrapeTargetUrl(drawingDate);

        return targetUrl;
    }
}

UrlScraper.prototype = BytePushers.inherit(BaseWebScraper.prototype);
UrlScraper.prototype.constructor = UrlScraper;
UrlScraper.prototype.superclass = BaseWebScraper;

module.exports = UrlScraper;