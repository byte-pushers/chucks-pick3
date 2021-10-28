define(['app'], function(app) {
    'use strict';
    return app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/view1");

        $stateProvider.state('view1',{
                url: '/view1',
                templateUrl: 'partials/view1.html',
                controller:'view1Controller'
            })
            .state('view2',{
                url: '/view2',
                templateUrl: 'partials/view2.html',
                controller: 'view2Controller'
            });
    });
});