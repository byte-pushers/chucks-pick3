/*jshint esversion: 6 */
/*jslint node: true, white: true, for: true, es6: true, this: true */

function BaseWebScraper(baseScraperConfig) {
    'use strict';
    var baseUrl = (baseScraperConfig && baseScraperConfig.baseUrl) ? baseScraperConfig.baseUrl : null,
        pr = (baseScraperConfig && baseScraperConfig.pageReader) ? baseScraperConfig.pageReader : {};

    this.getBaseUrl = function () {
        return baseUrl;
    };

    this.getPageReader = function () {
        return pr;
    };
}

module.exports = BaseWebScraper;
