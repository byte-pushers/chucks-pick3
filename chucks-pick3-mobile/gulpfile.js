const { src, dest, task } = require("gulp"),
  clean = require("gulp-clean"),
  gutil = require("gulp-util");
const exec = require("child_process").exec;

exports.default = defaultTask;

function defaultTask(cb) {
  // place code for your default task here
  if (process.env.USE_MOCKS === "true") {
    exec("ionic serve --configuration=mock");
  } else {
    exec("npm run use-prod && ionic serve --configuration=prod");
  }
  cb();
}

task("remove-mocks", function () {
  return src(["src/**/*mock*.*"], { read: false }).pipe(clean());
});

task("include-mocks", function (done) {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  if (process.env.USE_MOCKS === "true") {
    src(["test/mocks/**/*.*", "test/environments/**/*.*"]).pipe(dest("src"));
  }

  done();
});
task("include-prod", function (done) {
  // the base option sets the relative root for the set of files,
  // preserving the folder structure
  console.log("inside inlcude-mocks gulp tasks.");
  if (process.env.USE_MOCKS === "true") {
    src(["test/prod/**/*.*", "test/environments/**/*.*"]).pipe(dest("src"));
  }

  done();
});
