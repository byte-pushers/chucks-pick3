var fs = require('fs');
var TRAVIS_BUILD_DIR = (process.argv[2] !== undefined && process.argv[2] !== null)? process.argv[2] : ".";

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}

function clean() {
    if (fs.existsSync(TRAVIS_BUILD_DIR + "/pick3-lottery-web-scraper.zip")) {
        fs.unlinkSync(TRAVIS_BUILD_DIR + "/pick3-lottery-web-scraper.zip");
        console.log("Removed " + TRAVIS_BUILD_DIR + "/pick3-lottery-web-scraper.zip file.");
    } else {
        console.log("Could not removed " + TRAVIS_BUILD_DIR + "/pick3-lottery-web-scraper.zip file.");
    }

    if (fs.existsSync(TRAVIS_BUILD_DIR + "/build")) {
        deleteFolderRecursive(TRAVIS_BUILD_DIR + "/build");
    }

    fs.mkdirSync(TRAVIS_BUILD_DIR + "/build");
}

clean();