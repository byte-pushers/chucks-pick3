define([
    'angular',
    'uiRouter',
    'controllers/index'
], function (ng) {
    return ng.module('app', ['app.controllers', 'ui.router']);
});