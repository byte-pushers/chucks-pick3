/*global BytePushers, console, window, module*/
/* jshint -W108, -W109, -W079 */

var window = window || {};
var module = module || {};

(function (window) {
    'use strict';

    var BytePushers;

    if (window.BytePushers !== undefined && window.BytePushers !== null) {
        BytePushers = window.BytePushers;
    } else {
        window.BytePushers = {};
        BytePushers = window.BytePushers;
    }

    BytePushers.filters = BytePushers.namespace("software.bytepushers.filters");
    BytePushers.filters.GenericProptertyFilter = BytePushers.namespace("software.bytepushers.filters.GenericProptertyFilter");

    BytePushers.filters.GenericProptertyFilter.DatePropteryFilter = function (values, date, propertyName) {
        var filteredDates = [];

        if (!Object.isArray(values)) {
            return;
        }

        values.forEach(function (value) {
            if (value[propertyName].valueOf() === date.valueOf()) {
                filteredDates.push(value);
            }
        });

        return filteredDates;
    };

    BytePushers.filters.GenericProptertyFilter.StringPropteryFilter = function (values, searchText, propertyName) {
        var filtered = [];

        if (!Object.isArray(values)) {
            return;
        }
        searchText = searchText.toLowerCase();

        values.forEach(function (value) {
            if (value[propertyName].toLowerCase().indexOf(searchText) >= 0) {
                filtered.push(value);
            }
        });

        return filtered;
    };

    module.exports = BytePushers;
}(window));
