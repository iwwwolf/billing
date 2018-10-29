'use strict';

//basic configuration object used by gulp tasks
module.exports = {
    port: 3000,
    uiPort: 3001,
    tmp: 'client-hodly/tmp',
    dist: 'build-hodly',
    base: 'client-hodly',
    tpl: 'client-hodly/src/**/*.tpl.html',
    mainScss: 'client-hodly/src/scss/',
    scss: 'client-hodly/src/scss/**/*.scss',
    sassSrc: 'client-hodly/assets/sass/',
    sassDest: 'client-hodly/assets/css',
    js: [
        'client-hodly/src/**/*.js',
        '!client-hodly/src/vendor/**/*.js',
        'client-hodly/test/unit/**/*.js',
        'client-hodly/test/e2e/**/*.js'
    ],
    index: 'client-hodly/index.html',
    assets: 'client-hodly/assets/**',
    images: 'client-hodly/assets/images/**/*',
    withdrawSassSrc: 'withdrawal-hodly-new/sass/',
    withdrawSassDest: 'withdrawal-hodly-new/css'
};
