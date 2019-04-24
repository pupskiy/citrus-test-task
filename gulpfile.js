'use strict';
const { gulp, src, dest, parallel, series, watch } = require ('gulp');
const sass = require ('gulp-sass');
const concat = require ('gulp-concat');
const autoprefixer = require ("gulp-autoprefixer");
const browserSync = require ('browser-sync').create();


function scssCompile() {
  return src('src/scss/main.scss')
    .pipe (sass.sync ().on('error', sass.logError))
		.pipe (autoprefixer (['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
		.pipe (concat ('main.css'))
    .pipe (dest ('build/css'));
};

function syncBrowsers() {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    notify: false
  });
};

function watchFiles() {
  syncBrowsers();

  // HTML
  watch('./index.html') .on('change', browserSync.reload);

  // CSS
  watch('src/scss/**/*.scss', { ignoreInitial: false }, scssCompile);
  watch('build/css/main.css') .on('change', browserSync.reload);
};


exports.watch = series(scssCompile, watchFiles);