var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

function getDataForFile(file) {
  return {
    example: 'data loaded for ' + file.relative
  };
}

gulp.task('nunjucks', function () {
  return gulp.src('src/html/pages/*.html')
    .pipe(data(getDataForFile))
    .pipe(nunjucksRender({
    path: 'src/html/templates/'
  }))
    .pipe(gulp.dest('dist'));
});

/**
 * Rebuild Nunjucks & do page reload
 */
gulp.task('nunjucks-rebuild', ['nunjucks'], function () {
 browserSync.reload();
});

// Standard Browser Sync
gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./dist/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/assets/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/assets/img/'));
});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('src/assets/css/main.sass')
        .pipe(plumber({
        errorHandler: function (err) {
            console.log(err);
            this.emit('end');
            }
        }))
        .pipe(sass({
            includePaths: ['css'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('dist/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('dist/assets/css/'));
});

gulp.task('scripts', function(){
  return gulp.src('src/assets/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(babel())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js/'))
    .pipe(browserSync.reload({stream:true}))
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
 gulp.watch('src/assets/css/**', ['sass']);
 gulp.watch('src/assets/js/**', ['scripts']);
 gulp.watch('**/*.html', ['nunjucks-rebuild']);
});

// Default
gulp.task('default', ['browser-sync','watch']);
