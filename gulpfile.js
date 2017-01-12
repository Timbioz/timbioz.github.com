var gulp = require('gulp');
var twig = require('gulp-twig');
var data = require("gulp-data");
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        browser: "firefox"
    });

    gulp.watch(["*.html", "js/*.js", "css/*.css"]).on("change", browserSync.reload);
});

gulp.task('twig:render', function () {
    return gulp.src('templates/html/**/*.twig') // run the Twig template parser on all .html files in the "src" directory
        .pipe(data(function() {
            return require('./data/object.json');
        }))
        .pipe(twig())
        .pipe(gulp.dest('')); // output the rendered HTML files to the "dist" directory
});


gulp.task('watch:twig', function () {
    gulp.watch('templates/**/*.twig' , ['twig:render']);
});

gulp.task("serve", ["browser-sync", "watch:twig"]);