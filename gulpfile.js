const gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  sass = require("gulp-sass")(require("sass")),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  autoprefixer = require("gulp-autoprefixer"),
  rigger = require("gulp-rigger");

let build = "build",
  source = "src";

/* include Header.html Footer.html  */
gulp.task("fileinclude", function () {
  return gulp
    .src([source + "/*.html"])
    .on("error", function (err) {
      this.emit("end");
    })
    .pipe(rigger())
    .pipe(gulp.dest("./build/"))
    .pipe(browserSync.stream());
});
//css bundle here
gulp.task("bundleCss", () => {
  return gulp
    .src(
      [
        source + "/libs/bootstrap/css/bootstrap.min.css",
        source + "/libs/owl-carousel/owl.carousel.min.css",
        source + "/libs/owl-carousel/owl.theme.default.min.css",
        source + "/libs/wow/animate.min.css",
        // plugin`s css
      ],
      { allowEmpty: true }
    )
    .pipe(cleanCSS()) //minify
    .pipe(concat("plugins.min.css"))
    .pipe(gulp.dest(build + "/assets/css"));
});

//sass compiles here
gulp.task("sass", () => {
  return gulp
    .src([
      source + "/assets/sass/imports.scss", // Always at the end
    ])

    .pipe(sass())
    .on("error", sass.logError)
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(concat("styles.css"))
    .pipe(gulp.dest(build + "/assets/css"))
    .pipe(browserSync.stream());
});

// scripts bundle starts
gulp.task("bundleScript", function () {
  return gulp
    .src(
      [
        source + "/libs/jquery/jquery.min.js",
        source + "/libs/bootstrap/js/popper.min.js",
        source + "/libs/bootstrap/js/bootstrap.min.js",
        source + "/libs/owl-carousel/owl.carousel.min.js",
        source + "/libs/wow/wow.min.js",
        // Plugin`s js here
      ],
      { allowEmpty: true }
    )
    .pipe(uglify()) //minify
    .pipe(concat("plugins.min.js"))
    .pipe(gulp.dest(build + "/assets/js"));
});

// scripts copy starts
gulp.task("script", function () {
  return gulp
    .src([
      source + "/assets/js/script.js", // Always at the end
    ])
    .pipe(concat("scripts.js"))
    .pipe(gulp.dest(build + "/assets/js"));
});

//icon min
gulp.task("icons", () =>
  gulp
    .src(source + "/assets/css-dep/icons/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest(build + "/assets/css/icons"))
);

//fonts copy
gulp.task("fonts", () =>
  gulp
    .src(source + "/assets/css-dep/fonts/**/*")
    .pipe(gulp.dest(build + "/assets/css/fonts"))
);

// img copy
gulp.task("imgs", () =>
  gulp.src(source + "/assets/img/**/*").pipe(gulp.dest(build + "/assets/img"))
);

//watch files
gulp.task("watch", function () {
  browserSync.init({
    watch: true,
    server: "./build",
  });

  gulp.watch(source + "/*.html", gulp.parallel("fileinclude"));
  gulp.watch(source + "/include/*.html", gulp.parallel("fileinclude"));
  gulp.watch(source + "/assets/**/*.scss", gulp.series("sass"));
  gulp.watch(source + "/assets/**/*.js", gulp.series("script"));
  gulp.watch(source + "/assets/img/**/*", gulp.series("imgs"));
  gulp.watch(source + "/assets/css-dep/icons/**/*", gulp.series("icons"));
  gulp.watch(source + "/assets/css-dep/fonts/**/*", gulp.series("fonts"));
  gulp.watch("build/**/*").on("change", browserSync.reload);
});

//gulp default test
gulp.task(
  "default",
  gulp.series(
    "fileinclude",
    "bundleCss",
    "bundleScript",
    "sass",
    "script",
    "imgs",
    "icons",
    "fonts",
    "watch"
  )
);
