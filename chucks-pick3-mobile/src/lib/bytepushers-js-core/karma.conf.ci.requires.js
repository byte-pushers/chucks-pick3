var baseConfig = require('./karma.conf.requires.js');

module.exports = function(config){
    baseConfig(config);

    config.set({
        singleRun: true,
        autoWatch: false,
        browsers: ['PhantomJS']
    });
};
