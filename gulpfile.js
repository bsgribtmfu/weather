const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sync = require("browser-sync").create();
const uglify = require('gulp-uglify');

const compress = () => {
  return gulp.src('source/js/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('source/js'))
  .pipe(sync.stream());
}

exports.compress = compress;

// Styles

const styles = () => {
  return gulp.src("source/css/**/*.css")
    .pipe(plumber())
    .pipe(gulp.dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/css/**/*.css", gulp.series('styles'));
  gulp.watch("source/js/*.js", gulp.series('compress'));
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, compress, server, watcher
);
