'use strict';

//basic configuration object used by gulp tasks
module.exports = {
  port: 3000,
  uiPort: 3001,
  tmp: 'client/tmp',
  dist: 'build',
  base: 'client',
  tpl: 'client/src/**/*.tpl.html',
  mainScss: 'client/src/scss/main.scss',
  scss: 'client/src/scss/**/*.scss',
  sassSrc: 'client/assets/sass/',
  sassDest: 'client/assets/css',
  withdrawSassSrc: 'withdrawal/sass/',
  withdrawSassDest: 'withdrawal/css',
  js: [
    'client/src/**/*.js',
    '!client/src/vendor/**/*.js',
    'client/test/unit/**/*.js',
    'client/test/e2e/**/*.js'
  ],
  index: 'client/index.html',
  assets: 'client/assets/**',
  images: 'client/assets/images/**/*',
  banner: ['/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
  ].join('\n')
};
