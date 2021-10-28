'use strict';

define("app", ["angular", "uiRouter"], function(angular) {
    var myApp = angular.module('myApp', ['ui.router']);

    myApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/view1");

        $stateProvider
            .state('view1', {
                url: "/view1",
                templateUrl: "view1/view1.html",
                controller: "view1Controller"
            })
            .state('view2', {
                url: "/view2",
                templateUrl: "view2/view2.html",
                controller: "view2Controller"
            });
    }]);

    return app;
});