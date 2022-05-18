const { src, dest, task } = require("gulp"),
  clean = require("gulp-clean"),
  gutil = require('gulp-util');

task("remove-mocks", function () {
  return src(["src/**/*mock*.*"], { read: false }).pipe(clean());
});

task("include-mocks", function (done) {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  console.log("inside inlcude-mocks gulp tasks.")
  if (process.env.USE_MOCKS === 'true') {
    src(["test/mocks/**/*.*","test/environments/**/*.*"]).pipe(dest("src"));
  }

  done();
});
