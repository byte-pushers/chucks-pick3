/**
 * Created by tonte on 2/28/16.
 */
define([
    'require',
    'angular',
    'app',
    'routes'
], function (require, ng) {

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['app']);
    });
});