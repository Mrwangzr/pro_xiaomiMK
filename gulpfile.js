var gulp = require("gulp");
var  sass = require("gulp-sass");
var rename = require("gulp-rename");

gulp.task('sass',function () {
    gulp.src("./sass/*.scss")
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest("./css"));
});

gulp.task('wSass',function () {
    gulp.watch("./sass/*.scss",["sass"]);
})