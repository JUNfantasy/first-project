const gulp = require("gulp");
gulp.task("hello",()=>{
    console.log("hellow world")
})
gulp.task("html",()=>{
    return gulp.src("index.html")
    .pipe(gulp.dest("dist/"))
})
gulp.task("script",()=>{
    return gulp.src(["libs/*.js","module/*.js"])
    .pipe(gulp.dest("dist/scripts"));
})