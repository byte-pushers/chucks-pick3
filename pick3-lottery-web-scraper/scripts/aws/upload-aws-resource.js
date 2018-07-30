var S3 = require('aws-sdk/clients/s3');
var Lambda = require('aws-sdk/clients/lambda');
var APIGateway = require('aws-sdk/clients/apigateway');
var fs = require('fs');
var s3BucketName = "com.bytepushers.chucks-pick3";
var lambdaFunctionName = 'ChucksPick3-GetWinningNumber';
var lambdaRole = "arn:aws:iam::406390965838:role/lambda-s3-execution-role";
var getChucksPick3WinningNumberParam = {
    FunctionName: lambdaFunctionName
};
var TRAVIS_BUILD_DIR = (process.argv[2] !== undefined && process.argv[2] !== null)? process.argv[2] + "/build": "./build";

//TRAVIS_BUILD_DIR += "/build";

function createS3Client() {
    return new S3();
}

function createLambdaClient() {
    return new Lambda({apiVersion: '2015-03-31', region: 'us-east-2'});
}

function createAPIGatewayClient() {
    return new APIGateway({apiVersion: '2015-07-09', region: 'us-east-2'});
}

function uploadToS3Bucket(s3, resource){
    var params = {
            Bucket: s3BucketName,
            Key: resource.key,
            Body: resource.value
        },
        putObjectPromise = s3.putObject(params).promise(),
        uploadToS3BucketPromise = new Promise(function (resolve, reject) {
            putObjectPromise.then(function(data) {
                console.log('Success: data: ' + data, data);
                resolve(resource.key);
            }).catch(function(err) {
                console.log('An error occurred: ' + err);
                reject(err);
            });
        });

    return uploadToS3BucketPromise;
}

function getZipFileName(path) {
    var zipFileName = null;

    if (fs.existsSync(path)) {
        fs.readdirSync(path).some(function (file, index) {
            zipFileName = file;
            return file.endsWith(".zip");
        });
    }

    if (zipFileName === undefined || zipFileName === null) {
        throw new Error("Could not find zip file.");
    }

    return zipFileName;
}

function getResource() {
    var filename = getZipFileName(TRAVIS_BUILD_DIR);
    var resourceBase64Data, resourceData = fs.readFileSync(TRAVIS_BUILD_DIR + "/" +filename);

    resourceBase64Data = new Buffer(resourceData, 'binary');

    return {key: filename, value: resourceBase64Data};
}

function updateLambdaFunction(key, lambda) {
    var params = {
        FunctionName: lambdaFunctionName,
        Publish: true,
        S3Bucket: s3BucketName,
        S3Key: key
    };

    lambda.updateFunctionCode(params, function(err, data) {
        if (err){
            console.log(err, err.stack); // an error occurred
            console.log("Lambda Function (" + lambdaFunctionName + ") NOT updated successfully.");
        }  else {
            console.log(data); // successful response
            console.log("Lambda Function (\" + lambdaFunctionName + \") updated successfully.");
        }
    });
}

function createLambdaFunction(key, lambda) {
    var params = {
        Code: {
            S3Bucket: s3BucketName,
            S3Key: key,
        },
        Description: "Gets Texas Pick 3 Lottery Winning Number for a specific date and time.",
        FunctionName: lambdaFunctionName,
        Handler: "index.retrieveWinningNumber", // is of the form of the name of your source file and then name of your function handler
        MemorySize: 128,
        Publish: true,
        Role: lambdaRole, // replace with the actual arn of the execution role you created
        Runtime: "nodejs8.10",
        Timeout: 30
    };
    lambda.createFunction(params, function(err, data) {
        if (err) {
            console.log(err, err.stack); // an error occurred
            console.log("Lambda Function (\" + lambdaFunctionName + \") NOT created successfully.");
        } else {
            console.log(data);// successful response
            console.log("Lambda Function (\" + lambdaFunctionName + \") created successfully.");
        }

    });
}

function deployLambdaResource(resourceName) {
    var lambda = createLambdaClient(),
        deployLambdaResourcePromise = new Promise(function (resolve, reject) {
            lambda.getFunction(getChucksPick3WinningNumberParam, function (error, data) {
                if (error) {
                    console.log(error, error.stack);
                    createLambdaFunction(resourceName, lambda);
                    reject(error);
                }
                else {
                    console.log(data);
                    updateLambdaFunction(resourceName, lambda);
                    resolve(data);
                }
            });
        });

    return deployLambdaResourcePromise;
}

function deployRestAPI(restApiResourceName) {
    var apig = createAPIGatewayClient(),
        createRestApiPromise = createRestApi(apig);

        createRestApiPromise.then(function(restApiInfo) {
           return getRestApiResources(apig, restApiInfo.id);
        }).then(function(restApiContext) {
            return createRestApiResource(apig, restApiContext, restApiResourceName);
        }).then(function(restApiContext) {
            return createPutMethod(apig, restApiContext);
        });
}

function getRestApiResources(apiGateway, restApiId) {
    var rootResourceId,
        promise = new Promise(function(resolve, reject) {
        apiGateway.getResources({ restApiId: restApiId}, function(error, restApiResourcesData) {
            if (!error) {
                console.log(restApiResourcesData);
                rootResourceId = getRootResourceIdentifier(restApiResourcesData);
                resolve({id: restApiId, rootResourceId: rootResourceId});
            } else {
                console.log(error, error.stack);
                reject(error);
            }
        })
    });

    return promise;
}

function createPutMethod(apiGateway, restApiContext, restApiHttpMethod) {
    var promise = new Promise(function (resolve, reject) {
        apiGateway.putMethod({
            restApiId: restApiContext.id,
            resourceId: restApiContext.resources[0].id,
            httpMethod: restApiHttpMethod,
            authorizationType: "NONE"
        }, function (error, data){
            if (error) { // an error occurred
                console.log(error, error.stack);
                reject(error)
            }
            else { // successful response
                console.log(data);
                restApiContext.resources = [];
                restApiContext.resources.push(data);
                resolve(restApiContext);
            }
        })
    });

    return promise;
}

function createRestApiResource(apiGateway, restApiContext, resourceName) {
    var promise = new Promise(function(resolve, reject) {
        apiGateway.createResource({
            resetApiId: restApiContext.id,
            parentId: restApiContext.rootResourceId,
            pathPart: resourceName
        }, function (error, data) {
            if (error) { // an error occurred
                console.log(error, error.stack);
                reject(error)
            }
            else { // successful response
                console.log(data);
                restApiContext.resources = [];
                restApiContext.resources.push(data);
                resolve(restApiContext);
            }
        })
    });

    return promise;

}

function createRestApi(apiGateway) {
    var params = {
            name: lambdaFunctionName + '-Rest-API', /* required */
            description: 'REST input for retrieving Texas Pick 3 Lottery Winning Number for a specific date and time.'
        },
        promise = new Promise(function (resolve, reject) {
            apiGateway.createRestApi(params, function(error, restApiInfo) {
                if (error) { // an error occurred
                    console.log(error, error.stack);
                    reject(error)
                }
                else { // successful response
                    console.log(restApiInfo);
                    resolve(restApiInfo);
                }
            });

        });

    return promise;
}

function getRootResourceIdentifier(restApiResourcesData) {
    var rootResourceId = null;

    if (Array.isArray(restApiResourcesData.items)) {
        restApiResourcesData.items.some(function (item) {
            if (item.path === "/") {
                rootResourceId = item.id;
                return true;
            }
        });
    }

    return rootResourceId;
}

uploadToS3Bucket(createS3Client(), getResource()).then(function(resourceName) {
    deployLambdaResource(resourceName).then(function (data) {
        var restApiResourceName = "winners";
        deployRestAPI(restApiResourceName);
    });
}, function (error) {
    console.log(error, error.stack);
});