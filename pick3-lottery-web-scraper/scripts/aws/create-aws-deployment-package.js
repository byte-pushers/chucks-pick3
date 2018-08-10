process.argv.forEach(function (val, index) {
    console.log(index + ': ' + val);
});

var fs = require('fs');
var AdmZip = require('adm-zip');
var datetime = require('node-datetime');
var shell = require('shelljs');
var dependencyTree = require('dependency-tree');
var TRAVIS_BUILD_DIR = (process.argv[4] !== undefined && process.argv[4] !== null)? process.argv[4] : ".";

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
    if (fs.existsSync(TRAVIS_BUILD_DIR + "/build")) {
        deleteFolderRecursive(TRAVIS_BUILD_DIR + "/build");
    }

    fs.mkdirSync(TRAVIS_BUILD_DIR + "/build");
}

function getAwsDeploymentSourcePackagePath() {
    return TRAVIS_BUILD_DIR + '/pick3-lottery-web-scraper.zip';
}

function getAwsDeploymentPackagePath() {
    var filename;
    var dt = datetime.create();
    var formatted = dt.format('Y.m.d.T.H.M.S');
    var branchName = (process.argv[2] !== undefined && process.argv[2] !== null) ? process.argv[2] : null;
    var commitNumber = (process.argv[3] !== undefined && process.argv[3] !== null) ? process.argv[3] : null;

    //filename = TRAVIS_BUILD_DIR + '/build/pick3-lottery-web-scraper';
    filename = 'pick3-lottery-web-scraper';

    if (branchName !== null && branchName !== undefined) {
        branchName = branchName.replace(/\//g, ".");
        console.log("Branch Name: " + branchName);
        filename += "." + branchName;
    }

    if (commitNumber !== null && commitNumber !== undefined) {
        console.log("Commit Number: " + commitNumber);
        filename += "." + commitNumber;
    }

    filename += '.' + formatted + '.zip';

    console.log("File Name: " + filename);

    return filename;
}

function createAwsDeploymentPackage(awsDeploymentSourcePackagePath) {
    console.log("createAwsDeploymentPackage() method: awsDeploymentSourcePackagePath: " + awsDeploymentSourcePackagePath);

    //create a zip object to hold the new zip files
    var newZip = new AdmZip();

    // reading archives
    var zip = new AdmZip(awsDeploymentSourcePackagePath);
    var zipEntries = zip.getEntries(); // an array of ZipEntry records

    zipEntries.forEach(function (zipEntry) {
        var fileName = zipEntry.entryName;
        //var fileContent = zip.readAsText(fileName);

        if (fileName.indexOf("/") > -1) {
            if (fileName.indexOf("src/main/javascript") > -1 && fileName.indexOf("node_modules") == -1) {
                //var newFileName = fileName.substring(fileName.lastIndexOf("/") + 1);
                //newZip.addFile(newFileName, fileContent, '', 0o644 << 16);
                zip.extractEntryTo(zipEntry, TRAVIS_BUILD_DIR + "/build", false, true);
            } else if (fileName.indexOf("node_modules") > -1) {
                //newZip.addFile(fileName, fileContent, '', 0o644 << 16);
                zip.extractEntryTo(zipEntry, TRAVIS_BUILD_DIR + "/build", true, true);
            }
        } else if (fileName === "package.json") {
            zip.extractEntryTo(zipEntry, TRAVIS_BUILD_DIR + "/build", false, true);
        }
    });

    getRequestModuleDependencies();

    shell.cd(TRAVIS_BUILD_DIR + '/build');
    shell.exec("zip -r " + getAwsDeploymentPackagePath() + " . -x \"*.DS_Store\"");
}

function printDirectoryInfo(dirPath) {
    console.log("current directory is " + dirPath);

    fs.readdirSync(dirPath).forEach(file => {
        console.log(file);
    });
}

function printOutWorkspaceInfo(workspacePath) {
    console.log("current directory is " + __dirname);
    printDirectoryInfo(__dirname);

    console.log("../../ is : ");
    printDirectoryInfo("../../");

    console.log("../../byte-pushers is : ");
    printDirectoryInfo("../../byte-pushers");

    console.log("../../byte-pushers/pick3-lottery-web-scraper is : ");
    printDirectoryInfo("../../byte-pushers/pick3-lottery-web-scraper");

    console.log("../../build is : ");
    printDirectoryInfo("../../build");

    if (TRAVIS_BUILD_DIR !== null) {
        console.log("TRAVIS_BUILD_DIR is: " + TRAVIS_BUILD_DIR);
        printDirectoryInfo(TRAVIS_BUILD_DIR);
    }
}

function getRelativePath(sourcePath, relativeSearchCriteria) {
    var relativeSearchCriteriaIndex = -1, relativePath;

    if (sourcePath !== null && sourcePath !== undefined && relativeSearchCriteria !== null && relativeSearchCriteria !== undefined) {
        relativeSearchCriteriaIndex = sourcePath.indexOf(relativeSearchCriteria);

        if (relativeSearchCriteriaIndex > -1) {
            relativePath = sourcePath.substring(relativeSearchCriteriaIndex);
        }
    }

    return relativePath;
}

function ensureTargetPathExist(targetPath) {
    var targetPaths = (targetPath)? targetPath.split("/"): [];
    var relativePath = "";
    var relativePathPrefix = TRAVIS_BUILD_DIR + "/build";

    targetPaths.forEach(function (path, pathIndex, paths) {
        if (path) {
            if (path.trim().length > 0) {
                if (pathIndex < paths.length -1) {
                    relativePath += "/" + path;

                    var sourcePackageJsonPath = TRAVIS_BUILD_DIR + relativePath + "/package.json";
                    var targetPackageJsonPath = relativePathPrefix + relativePath + "/package.json";

                    if (!fs.existsSync(relativePathPrefix + relativePath)) {
                        fs.mkdirSync(relativePathPrefix + relativePath);

                        if (pathIndex === 2) {
                            if (relativePath.search("ajv") > -1) {
                                sourcePackageJsonPath = TRAVIS_BUILD_DIR + relativePath;
                                targetPackageJsonPath = relativePathPrefix + relativePath;
                                targetPackageJsonPath = targetPackageJsonPath.substring(0, targetPackageJsonPath.length -3);

                                shell.exec("cp -R " + sourcePackageJsonPath + " " + targetPackageJsonPath);
                            }
                        }
                    }

                    if (pathIndex === 2) {
                        if (relativePath.search("ajv") === -1) {
                            if (fs.existsSync(sourcePackageJsonPath)) {
                                shell.exec("cp " + sourcePackageJsonPath + " " + targetPackageJsonPath);
                            }
                        }
                    }
                }
            }
        }
    });
}

function getRequestModuleDependencies() {
    var project = getProjectInfo(),
        projectDependencyTree,
        dependencyName;

    for (dependencyName in project.dependencies) {
        projectDependencyTree = dependencyTree.toList({
            filename: TRAVIS_BUILD_DIR + "/node_modules/" + dependencyName + "/index.js",
            directory: TRAVIS_BUILD_DIR + "/node_modules/" + dependencyName,
        });

        projectDependencyTree.forEach(function (dependencyTreeSourcePath, dependencyTreeIndex) {
            var dependencyTreeTargetPath = getRelativePath(dependencyTreeSourcePath, "/node_modules");
            var copyCommand = "cp " + dependencyTreeSourcePath + " " + TRAVIS_BUILD_DIR + "/build" + dependencyTreeTargetPath;

            console.log("dependency["+dependencyTreeIndex+"]: " + dependencyTreeSourcePath);
            console.log("copy command: " + copyCommand);

            ensureTargetPathExist(dependencyTreeTargetPath);

            if (dependencyTreeTargetPath.search("ajv") === -1) {
                shell.exec(copyCommand);
            }
        });
    }
}

function getProjectInfo() {
    var dependencies = JSON.parse(fs.readFileSync(TRAVIS_BUILD_DIR + '/package.json', 'utf8'));
    return dependencies;
}

clean();
createAwsDeploymentPackage(getAwsDeploymentSourcePackagePath());