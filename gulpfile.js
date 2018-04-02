var fileinclude = require('gulp-file-include'),
    gulp = require('gulp'),
    gls = require('gulp-live-server');
    uglify = require('gulp-uglify'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    gulpSass = require('gulp-sass');

gulp.task('default', ['compile-templates', 'sass', 'js'], function() {
    var server = gls.static('dist', 8888);
    server.start();

    gulp.watch(['src/**/*.js'],     ['js']);
    gulp.watch(['src/**/*.scss'],   ['sass']);
    gulp.watch(['src/**/*.html'],   ['compile-templates']);
    gulp.watch(['dist/**/*.css', 'dist/**/*.html', 'dist/**/*.js'], function (file) {
      server.notify.apply(server, [file]);
    });
});

gulp.task('js', function() {
    gulp.src(['./src/js/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('sass', function() {
    gulp.src('src/styles/**/**/*.scss')
       // .pipe(sourcemaps.init())
        .pipe(gulpSass({
            outputStyle: 'compressed',
            includePaths: ['./src/styles']
        }).on('error', gulpSass.logError))
        // .pipe(sourcemaps.write())
        .pipe(cleanCss())
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('compile-templates', function() {
    gulp.src(['src/pages/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist'));
});