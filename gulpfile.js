const gulp = require("gulp");
const connect = require("gulp-connect");
//合并插件
const concat = require("gulp-concat");
//压缩插件
const uglify = require("gulp-uglify");
//es6的编译
//babel
const babel = require("gulp-babel")
// gulp.task("html",()=>{
//     return gulp.src("index.html")
//     .pipe(gulp.dest("dist/"))
// })
gulp.task("script",()=>{
    return gulp.src(["libs/*.js","module/*.js",
    "!libs/tree.js"])
    .pipe(gulp.dest("dist/scripts"));
})
// gulp.task("default",["html","script"])
//监听
// gulp.task("watch",()=>{
//     gulp.watch("index.html",["html"])
// })


//gulp 插件



gulp.task("connect",()=>{
    connect.server({
        root:"dist/",
        livereload:true,
        middleware: function (connect, opt) {
            var Proxy = require('gulp-connect-proxy');
            opt.route = '/proxy';
            var proxy = new Proxy(opt);
            return [proxy];
          }
    });
})

gulp.task("html",()=>{
    return gulp.src("index.html")
    .pipe(gulp.dest("dist"))
    //数据更新之后进行页面刷新
    .pipe(connect.reload());
})
gulp.task("watch",()=>{
    gulp.watch("index.html",["html"])
})

//合并 压缩插件
gulp.task("script",()=>{
    return gulp.src(["module/*.js","libs/*.js"])
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(concat("bundle.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/script"))
})

gulp.task("default",["watch","connect"])



