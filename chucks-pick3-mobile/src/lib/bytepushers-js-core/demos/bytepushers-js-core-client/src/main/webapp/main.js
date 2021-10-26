requirejs.config({
    paths: {
        'angular' : 'bower_components/angular/angular.min',
        'uiRouter': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'domReady': 'bower_components/domready/domReady',
        /*The configuration below does not load modules/js files defined within the index.js file*/
        /*'bytepushers': 'jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/index'*/
        /*The configuration below successfully loads one JS file; Which is com.bytepushers.base.app.js*/
        'bytepushers': 'jspm_packages/github/byte-pushers/bytepushers-common-js@0.0.4/com.bytepushers.base.app'
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