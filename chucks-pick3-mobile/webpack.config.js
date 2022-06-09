// Dirty way to get everything working.
const path = require("path");
const tsconfig = require("./tsconfig.json");
const webpackConfig = require("@ionic/app-scripts/config/webpack.config");

// Add node_modules and src to webpack modules.
let modules = [path.resolve("node_modules"), path.resolve(tsconfig.compilerOptions.baseUrl)];

// Creates aliases for each of the paths in tsconfig. We need to strip out the '/*' in order for weback to like it.
let aliases = {};
for (alias in tsconfig.compilerOptions.paths) {
  let key = alias.replace("/*", "");
  aliases[key] = path.join(__dirname, "./src", tsconfig.compilerOptions.paths[alias][0]).replace("/*", "");
}

webpackConfig.dev.resolve = webpackConfig.prod.resolve = {
  extensions: [".ts", ".js", ".json"],
  // Add our modules here.
  modules: modules,
  // Add our aliases here.
  alias: aliases,
};
