// gulpfile originally pulled from https://github.com/LucasWinkler/gulp-boilerplate
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const replace = require('gulp-replace');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const nodemon = require('gulp-nodemon');

const paths = {
  html: { //saving html for later
    src: ['./public/src/html/*.html', './public/src/html/**/*.html'],
    dest: './public/build/html'
  },
  styles: {
    src: ['./public/src/scss/*.scss', './public/src/scss/**/*.scss'],
    dest: './public/build/css'
  },
  scripts: {
    src: './public/src/js/**/*.js',
    dest: './public/build/js'
  },
  vendors: {
    src: './public/src/js/vendors/**/*.js',
    dest: './public/build/js'
  },
  images: {
    src: './public/src/img/**/*',
    dest: './public/build/img'
  },
  favicon: {
    src: './public/src/favicon/favicon.ico',
    dest: './public/build/img'
  }
};

const clean = () => del(['./public/build']);

// Cache busting to prevent browser caching issues
const curTime = new Date().getTime();
const cacheBust = () =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(replace(/cb=\d+/g, 'cb=' + curTime))
    .pipe(gulp.dest(paths.html.dest));


// Copies all html files
const html =() =>
  gulp
    .src(paths.html.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.html.dest));

// Convert scss to css, auto-prefix and rename into styles.min.css
const styles = () =>
  gulp
    .src(paths.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        basename: 'styles',
        suffix: '.min'
      })
    ) 
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));

// Minify all javascript files and concat them into a single app.min.js
const scripts = () =>
  gulp
    .src(paths.scripts.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scripts.dest));

// Minify all javascript vendors/libs and concat them into a single vendors.min.js
const vendors = () =>
  gulp
    .src(paths.vendors.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ['@babel/preset-env']
      })
    )
    .pipe(terser())
    .pipe(concat('vendors.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.vendors.dest));

// Copy and minify images
const images = () =>
  gulp
    .src(paths.images.src)
    .pipe(plumber())
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));

// Copy the favicon
const favicon = () =>
  gulp
    .src(paths.favicon.src)
    .pipe(plumber())
    .pipe(gulp.dest(paths.favicon.dest));

// Watches all .scss, .js and .html changes and executes the corresponding task
function watchFiles(done) {
  nodemon({
    script: 'app.js', ext: 'js html' , env: { 'NODE_ENV': 'development' }, done: done
  });

  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.vendors.src, vendors);
  gulp.watch(paths.favicon.src, favicon);
  gulp.watch(paths.scripts.src, scripts);
  gulp.watch(paths.images.src, images);
  gulp.watch('./app/*.html', html);
}

const build = gulp.series(
  clean,
  gulp.parallel(styles, vendors, scripts, images, favicon),
  cacheBust
);

const watch = gulp.series(build, watchFiles);

exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.vendors = vendors;
exports.images = images;
exports.favicon = favicon;
exports.watch = watch;
exports.build = build;
exports.default = build;