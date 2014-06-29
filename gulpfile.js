var lr = require('tiny-lr');
var gulp = require('gulp');
var gulputil = require('gulp-util');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var usemin = require('gulp-usemin');

var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');


var minifyCss = require('gulp-minify-css');

server = lr();

var publicFolder = 'public/';

gulp.task('bower', function() {

    bower()
        .pipe(gulp.dest(publicFolder + 'lib/'));

});


gulp.task('imagemin',function() {
    gulp.src('public/images/*')
        .pipe(imagemin({
            optimizationLevel:3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/images/'));

      gulp.src('public/data/*png')
        .pipe(imagemin({
            optimizationLevel:3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/data/'));

             
})

var filesToMove = [
        publicFolder+'data/**/*.*',
        // publicFolder+'images/**/*.*',
        publicFolder+'templates/**/*.*'
    ];

gulp.task('usemin', function(){
  gulp.src(publicFolder+'index.html')
    .pipe(usemin({
         css: [minifyCss(), 'concat'],
      js: [uglify()]
      // in this case css will be only concatenated (like css: ['concat']).
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy',function() {
    gulp.src(filesToMove, { base: publicFolder })
  .pipe(gulp.dest('dist'));

})

gulp.task('build',['bower','usemin','copy','imagemin']);
//Step:
// merge-geojson-features

gulp.task('default', ['bower', 'listen'], function() {
    gulp.src(publicFolder + '*')
        .pipe(watch())
        .pipe(livereload(server));
        
    // gulp.src('./scss/*.scss')
    //     .pipe(watch())
    //     .pipe(sass())
    //     .pipe(gulp.dest(publicFolder + 'styles/'))
    //     .pipe(livereload(server));
});

gulp.task('listen', function(next) {
    server.listen(35729, function(err) {
        if (err) return console.error(err);
        next();
    });
});