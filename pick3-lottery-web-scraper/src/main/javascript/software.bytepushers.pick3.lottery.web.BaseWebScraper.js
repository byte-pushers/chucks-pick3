function BaseWebScraper(baseScraperConfig) {
    'use strict';

    var url = (baseScraperConfig && baseScraperConfig.url)? baseScraperConfig.url: null;
    var $ = (baseScraperConfig && baseScraperConfig.cheerio)? baseScraperConfig.cheerio: {};

    this.getUrl = function () {
        return url;
    };

    this.getCheerio = function () {
        return $;
    };

}

module.exports = BaseWebScraper;