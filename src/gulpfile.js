var gulp = require('gulp'),
    svgo = require('gulp-svgo'),
    svgSprite = require('gulp-svg-sprites');


var $ = require('gulp-load-plugins')();

var sassPaths = [
    'node_modules/foundation-sites/scss',
    'node_modules/motion-ui/src'
];

gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('../css'));
});

// Concat and minify all js files
gulp.task('js', function () {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/what-input/dist/what-input.min.js',
        'node_modules/foundation-sites/dist/js/foundation.min.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'js/app.js',
    ])
        .pipe($.concat('all.js'))
        .pipe($.minify({
            ext: {
                src: '-debug.js',
                min: '.min.js'
            },
            exclude: ['min'],
            ignoreFiles: ['*-debug.js']
        }))
        .pipe(gulp.dest('../js'))
});

// Compress svg files
gulp.task('compressSvg', () => {

    return gulp.src('svg/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('svg/min'));
});

// Gneerate svg sprite
gulp.task('svg', function () {
    return gulp.src('svg/*.svg')
        .pipe(svgSprite({mode: 'symbols'}))
        .pipe(gulp.dest('../img'));
});


gulp.task('default', ['sass', 'js', 'svg'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['js/app.js'], ['js']);
    // gulp.watch(['svg/*.svg'], ['compressSvg']);
    gulp.watch(['svg/*.svg'], ['svg']);
});
