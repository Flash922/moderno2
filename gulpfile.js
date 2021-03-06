let gulp = require('gulp'),

autoprefixer = require('gulp-autoprefixer'),
browserSync = require('browser-sync').create(),
concat = require('gulp-concat'),
cssmin = require('gulp-cssmin'),
rename = require('gulp-rename'),
sass = require('gulp-sass')(require('sass')),
uglify = require('gulp-uglify');



gulp.task('sass', function(){
  return gulp.src('app/scss/style.scss')
              .pipe(sass({outputStyle: 'compressed'}))
              .pipe(autoprefixer({
                overrideBrowserslist: ['last 8 versions']
                }))
              .pipe(rename({suffix : '.min'}))
              .pipe(gulp.dest('app/css'))
              .pipe(browserSync.stream())
});

gulp.task('style', function(){
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
    'node_modules/magnific-popup/dist/magnific-popup.css'
  ])
  .pipe(concat('libs.min.css'))
  .pipe(cssmin())
  .pipe(gulp.dest('app/css'));
});

gulp.task('script', function(){
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
    'node_modules/magnific-popup/dist/jquery.magnific-popup.js'
  ])
  .pipe(concat('libs.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
});


gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: "./app"
        }
    });
});

gulp.task('watch', function(){
  gulp.watch('app/scss/style.scss', gulp.parallel('sass'))
  gulp.watch("app/*.html").on('change', browserSync.reload)
  gulp.watch("app/js/*.js").on('change', browserSync.reload)
});

gulp.task('default', gulp.parallel('style', 'script', 'sass', 'watch', 'browser-sync'));

