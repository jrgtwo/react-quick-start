const gulp = require('gulp');
const babel = require('gulp-babel');
const runSequence = require('run-sequence');
const webserver = require('gulp-webserver');

gulp.task('move-external', () => {
  return gulp.src([
      'node_modules/react/umd/react.production.min.js',
      'node_modules/react-dom/umd/react-dom.production.min.js',
      'node_modules/systemjs/dist/system.src.js'
    ])
    .pipe(gulp.dest('build/js/external'));

});

gulp.task('move-src', () => {
  return gulp.src(['src/**/*', '!src/js/**/*'])
    .pipe(gulp.dest('build'));
})

gulp.task('babel', () => {
  return gulp.src('src/js/**/*')
    .pipe(babel())
    .pipe(gulp.dest('build/js'));
});

gulp.task('serve', () => {
  gulp.src('build')
    .pipe(webserver({
      livereload: false,
      directoryListing: false,
      open: true
    }));
});

gulp.task('watch', () => {
  gulp.watch(['src/js/**/*'], ['babel']);
  gulp.watch(['src/**/*', '!src/js/**/*'], ['move-src']);
});

gulp.task('runDev', (cb) => {
  return runSequence(
    'move-src',
    'babel',
    'move-external',
    'serve',
    'watch',
    cb
  );
});

gulp.task('dev', ['runDev'])