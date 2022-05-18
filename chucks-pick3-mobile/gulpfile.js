const { src, dest, task } = require("gulp"),
  clean = require("gulp-clean");

var mockFilesToMove = ["app/**/*"];

task("remove-mocks", function () {
  return src(["./src"], { read: false }).pipe(clean());
});

task("include-mocks", function (done) {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  src(mockFilesToMove, { base: "./", cwd: "test/mocks" }).pipe(dest("src"));
  done();
});
