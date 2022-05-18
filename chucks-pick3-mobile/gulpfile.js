const { src, dest, task } = require("gulp"),
  clean = require("gulp-clean");

var mockFilesToMove = ["./test/mocks/*.*"];

gulp.task("remove-mocks", function () {
  return src(["dist/*"], { read: false }).pipe(clean());
});

gulp.task("include-mocks", function () {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  src(mockFilesToMove, { base: "./", cwd: "src" }).pipe(dest("src"));
});
