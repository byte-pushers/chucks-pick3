// Karma configuration
// Generated on Sat Dec 26 2015 13:18:03 GMT-0800 (PST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'requirejs'],
    files: [
      {pattern: 'node_modules/bytepushers-js-obj-extensions/release/bytepushers-js-obj-extensions.js', included: true},
      {pattern: 'src/main/javascript/*.js', included: false},
      {pattern: 'src/test/javascript/*.js', included: false},
      'test-main.js'
    ],
    exclude: [
    ],
    preprocessors: {
        'src/main/**/*.js': ['coverage']
    },
    reporters: ['progress', 'coverage'],
    coverageReporter: {
        dir: 'build/reports/coverage'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
};
