const del         = require('del');
const gulp        = require('gulp');
const gUtil       = require('gulp-util');
const path        = require('path');
const webpack     = require('webpack');
const nodemon    = require('nodemon');
const runSequence = require('gulp4-run-sequence');
const log         = gUtil.log;
const colors      = gUtil.colors;
const paths       = {
  src: {
    root: 'src',
    js: ['src/**/*.js', '!src/**/*.spec.js']
  },
  build: {
    root: 'build'
  },
  test: {
    root: 'test',
    js: 'test/assets/js'
  }
};

gulp.task('clean', () => del([paths.build.root]));

gulp.task('build', gulp.series('clean', (cb) => {
  runSequence('webpack', cb);
}));

gulp.task('watch', gulp.series('build', () => {
  // initialize watch functionality with BrowserSync here
  // to re-build assets on file changes, then reload browser
  if (process.env.NODE_ENV !== 'production') {
    nodemon({
      script: 'app.js', ext: 'js html', env: { 'NODE_ENV': 'development' }
    });
  }

  gulp.watch(paths.src.js, () => {
    runSequence('webpack');
  });
}));

gulp.task('webpack', (callback) => {
  const webpackConfig = Object.assign({}, require('./webpack.config.js'));

  if (process.env.NODE_ENV === 'test') {
    webpackConfig.output.path = path.resolve('./', paths.test.js);
  }

  if (process.env.NODE_ENV !== 'production') {
    webpackConfig.devtool = 'eval-source-map';
  }

  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    if (err) {
      throw new gUtil.PluginError('webpack', err);
    }

    log('[webpack]', stats.toString({
      colors: true
    }));

    callback();
  });
});
