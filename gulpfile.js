'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var Config = require('./gulpfile.config');

var config = new Config();

gulp.task('libs', function () {
  return gulp.src(config.moduleLibs)
    .pipe(concat(config.allLibs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.outputJs));
});

gulp.task('coffee', function () {
  return gulp.src([config.sourceAppCoffee])
    .pipe(coffee({ bare: true }).on('error', gutil.log))
    .pipe(gulp.dest(config.sourceApp));
});

gulp.task('app', ['coffee'], function () {
  return gulp.src([config.sourceAppJs])
    .pipe(concat(config.allApp))
    .pipe(gulp.dest(config.outputJs))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.outputJs));
});

gulp.task('styles', function () {
  return gulp.src(config.moduleStyles)
    .pipe(concat(config.allStyles))
    .pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.outputCss));
});

gulp.task('bootstrap fonts', function () {
  return gulp.src([config.bootstrapFonts])
    .pipe(gulp.dest(config.outputFonts));
});

gulp.task('default', ['libs', 'coffee', 'app', 'styles', 'bootstrap fonts']);