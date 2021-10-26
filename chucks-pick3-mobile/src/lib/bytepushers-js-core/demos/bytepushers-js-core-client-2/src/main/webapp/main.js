requirejs.config({
    paths: {
        angular : 'bower_components/angular/angular.min',
        uiRouter: 'bower_components/angular-ui-router/release/angular-ui-router.min',
        domReady: 'bower_components/domReady/domReady',
        bytepushers: '../../../node_modules/bytepushers-js-core/bytepushers-js-core.min'
    },

    shim: {
        angular: {
            exports: 'angular'
        },
        uiRouter : {
            deps : ['angular']
        },
        bytepushers: {
            exports: 'BytePushers'
        }
    },

    deps: ["./bootstrap"]
});