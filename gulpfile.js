import gulp from 'gulp';
import less from 'gulp-less';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'mqpacker';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import squoosh from 'gulp-libsquoosh';
import { deleteAsync } from 'del';
import browser from 'browser-sync';

const clean = () => {
  return deleteAsync('build');
};

const copy = (done) => {
  gulp.src([
    'fonts/**/*.{woff,woff2}',
    'img/**'
  ], {
    base:'.'
  })
    .pipe(gulp.dest('build'))
    done();
};

const styles = () => {
  return gulp.src('less/style.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      mqpacker(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(browser.stream());
};

const optimizeImages = () => {
  return gulp.src('build/img/**/*.{png,jpg,gif}')
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'));
};

const scripts = () => {
  return gulp.src('js/*.js')
    .pipe(gulp.dest('build/js'))
}

const html = () => {
  return gulp.src('*.html')
    .pipe(gulp.dest('build'));
}

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build/'
    },
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
  done();
};

const reload = (done) => {
  browser.reload();
  done();
};

const watcher = () => {
  gulp.watch('less/**/*.less', gulp.series(styles));
  gulp.watch('js/*.js', gulp.series(scripts));
  gulp.watch('*.html', gulp.series(html, reload));
}

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    scripts,
    html
  ),
);

export default gulp.series(
  clean,
  copy,
  gulp.parallel(
    styles,
    scripts,
    html
  ),
  gulp.series(
    server,
    watcher
  ));
