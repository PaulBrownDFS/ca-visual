'use strict';
var pkg = require('./package.json');
var gulp = require('gulp');
var del = require('del');
var path = require('path');

var $ = require('gulp-load-plugins')();
gulp.task('clear', function () {
    return del(pkg.config.dist + '/*');
});

gulp.task('code-quality', function () {
    return gulp.src(path.join(pkg.config.src, '/**/*.js'))
        .pipe($.eslint())
        .pipe($.eslint.format())
        .pipe($.jscs({fix: false, configPath: '.jscsrc'}));
});

gulp.task('jscs-fix', function () {
    return gulp.src(path.join(pkg.config.src, '/**/*.js'))
        .pipe($.jscs({fix: false, configPath: '.jscsrc'}));
});

gulp.task('scripts', function () {
    return gulp.src(path.join(pkg.config.src, '/**/*.js'))
        .pipe($.sourcemaps.init()) 
        .pipe($.uglify())
        .pipe($.rename(function (path) {
            path.basename = pkg.name;
            path.extname = ".min.js"
        }))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(pkg.config.dist));
});

gulp.task('test-node', function () {
    return gulp.src(['tests/**/*.spec.js','!tests/**/*-browser.spec.js']).pipe($.jasmineNode({
        timeout: 10000
    }));
});

gulp.task('test-browser', function () {
    return gulp.src(['src/**/*js','tests/**/*.spec.js'])
        .pipe($.jasmineBrowser.specRunner({console: true}))
        .pipe($.jasmineBrowser.server({port: 3001}));
});

gulp.task('default', ['clear'], function () {
    gulp.start('code-quality', 'test-node', 'test-browser', 'scripts');
});