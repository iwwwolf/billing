'use strict';

//var config = require('./build.config.js');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var pkg = require('./package');
var del = require('del');
var _ = require('lodash');

var concat = require('gulp-concat');
var sftp = require('gulp-sftp');
var sass = require('gulp-sass');
var groupMediaCss = require('gulp-group-css-media-queries');
var prefixer = require('gulp-autoprefixer');
var watch = require('gulp-watch');
var wait = require('gulp-wait');


const arg = (argList => {

    let arg = {}, a, opt, thisOpt, curOpt;
    for (a = 0; a < argList.length; a++) {

        thisOpt = argList[a].trim();
        opt = thisOpt.replace(/^\-+/, '');

        if (opt === thisOpt) {
            if (curOpt) arg[curOpt] = opt;
            curOpt = null;
        }
        else {
            curOpt = opt;
            arg[curOpt] = true;
        }

    }

    return arg;
})(process.argv);


if (arg.host === 'hodly') {
    var config = require('./build.hodly.config.js');
} else {
    var config = require('./build.config.js');
}

// optimize images and put them in the dist folder
gulp.task('images', function() {
  return gulp.src(config.images)
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dist + '/assets/images'))
    .pipe($.size({
      title: 'images'
    }));
});

//generate angular templates using html2js
gulp.task('templates', function() {
  return gulp.src(config.tpl)
    .pipe($.changed(config.tmp))
    .pipe($.html2js({
      outputModuleName: 'templates',
      base: 'client',
      useStrict: true
    }))
    .pipe($.concat('templates.js'))
    .pipe(gulp.dest(config.tmp))
    .pipe($.size({
      title: 'templates'
    }));
});

//generate css files from scss sources


// gulp.task('sass', function() {
//   return gulp.src(config.mainScss)
//     .pipe($.sass())
//     .on('error', $.sass.logError)
//     .pipe(gulp.dest(config.tmp))
//     .pipe($.size({
//       title: 'sass'
//     }));
// });

//build files for creating a dist release
gulp.task('build:dist', ['clean'], function(cb) {
  runSequence(['build', 'copy', 'copy:assets'], 'html', cb);
});

//build files for development
gulp.task('build', ['clean'], function(cb) {
  runSequence([ 'templates'], cb);
});

//generate a minified css files, 2 js file, change theirs name to be unique, and generate sourcemaps
gulp.task('html', function() {
  var assets = $.useref.assets({
    searchPath: '{build,client}'
  });

  return gulp.src(config.index)
    .pipe(assets)
    .pipe($.sourcemaps.init())
    .pipe($.if('**/*main.js', $.ngAnnotate()))
    .pipe($.if('*.js', $.uglify({
      mangle: false,
    })))
    .pipe($.if(['**/*main.js', '**/*main.css'], $.header(config.banner, {
      pkg: pkg
    })))
    .pipe($.rev())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.if('*.html', $.minifyHtml({
      empty: true
    })))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist))
    .pipe($.size({
      title: 'html'
    }));
});

//copy assets in dist folder
gulp.task('copy:assets', function() {
  return gulp.src(config.assets, {
      dot: true
    }).pipe(gulp.dest(config.dist + '/assets'))
    .pipe($.size({
      title: 'copy:assets'
    }));
});

//copy assets in dist folder
gulp.task('copy', function() {
  return gulp.src([
      config.base + '/i18n/*',
      '!' + config.base + '/*.html',
      '!' + config.base + '/src',
      '!' + config.base + '/test'
    ]).pipe(gulp.dest(config.dist + '/i18n/'))
    .pipe($.size({
      title: 'copy'
    }));
});

//clean temporary directories
gulp.task('clean', del.bind(null, [config.dist, config.tmp]));

//lint files
gulp.task('jshint', function() {
  return gulp.src(config.js)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
   // .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

//default task
gulp.task('default', ['serve']);

//run the server after having built generated files, and watch for changes
gulp.task('serve', ['build'], function() {
  browserSync({
    port: config.port,
    ui: {
      port: config.uiPort
    },
    notify: false,
    logPrefix: pkg.name,
    server: ['build', 'client']
  });

  gulp.watch(config.html, reload);
  gulp.watch(config.scss, ['sass', reload]);
  gulp.watch(config.js, ['jshint']);
  gulp.watch(config.tpl, ['templates', reload]);
  gulp.watch(config.assets, reload);
});

//run the app packed in the dist folder
gulp.task('serve:dist', ['build:dist'], function() {
  browserSync({
    port: config.port,
    ui: {
      port: config.uiPort
    },
    notify: false,
    server: [config.dist]
  });
});


// Ivan Volkov

gulp.task('sass-new', function () {
    gulp.src(config.sassSrc + 'main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        //.pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(groupMediaCss())
        .pipe(gulp.dest(config.sassDest))
        // .pipe(sftp({
        //     host: 'build37990.sandbox3.mobbtech.com',
        //     port: '2201',
        //     remotePath: '/app/basic/web/frontend/' + config.sassDest,
        //     auth: 'privateKeyCustom'
        // }));
});

gulp.task('sass-watch', function(){
    watch(config.sassSrc + '*.scss', function(event, cb) {
        gulp.start('sass-new');
    });
});

gulp.task('sass-build', function(cb){
    runSequence('sass-new', 'sass-watch', cb);
});


// withdrawal

gulp.task('sass-withdrawal', function () {
    gulp.src(config.withdrawSassSrc + 'main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(prefixer())
        //.pipe(cssmin())
        .pipe(concat('main.css'))
        .pipe(groupMediaCss())
        .pipe(gulp.dest(config.withdrawSassDest))
        // .pipe(sftp({
        //     host: 'build37990.sandbox3.mobbtech.com',
        //     port: '2201',
        //     remotePath: '/app/basic/web/frontend/' + config.withdrawSassDest,
        //     auth: 'privateKeyCustom'
        // }));
});

gulp.task('sass-watch-withdrawal', function(){
    watch(config.withdrawSassSrc + '*.scss', function(event, cb) {
        gulp.start('sass-withdrawal');
    });
});

gulp.task('sass-build-withdrawal', function(cb){
    runSequence('sass-withdrawal', 'sass-watch-withdrawal', cb);
});
