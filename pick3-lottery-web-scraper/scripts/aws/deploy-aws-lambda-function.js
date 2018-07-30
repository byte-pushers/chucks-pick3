var AWS = require('aws-sdk');
var lambda = new AWS.Lambda({apiVersion: '2015-03-31', region: 'us-east-2'});
var lambdaFunctionName = 'ChucksPick3-GetWinningNumber';
var s3BucketName = "com.bytepushers.chucks-pick3";
var getChucksPick3WinningNumberParam = {
    FunctionName: lambdaFunctionName
};

lambda.getFunction(getChucksPick3WinningNumberParam, function (error, data) {
   if (error) {
       console.log(error, error.stack);
       createLambdaFunction()
   }
   else {
       console.log(data);
       updateLambdaFunction();
   }
});

function updateLambdaFunction() {
    var params = {
        FunctionName: lambdaFunctionName,
        Publish: true,
        S3Bucket: s3BucketName,
        S3Key: "myKey",
        S3ObjectVersion: "1",
        ZipFile: <Binary String>
};
    lambda.updateFunctionCode(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
        /*
        data = {
         CodeSha256: "LQT+0DHxxxxcfwLyQjzoEFKZtdqQjHXanlSdfXBlEW0VA=",
         CodeSize: 123,
         Description: "",
         FunctionArn: "arn:aws:lambda:us-west-2:123456789012:function:myFunction",
         FunctionName: "myFunction",
         Handler: "index.handler",
         LastModified: "2016-11-21T19:49:20.006+0000",
         MemorySize: 128,
         Role: "arn:aws:iam::123456789012:role/lambda_basic_execution",
         Runtime: "python2.7",
         Timeout: 123,
         Version: "1",
         VpcConfig: {
         }
        }
        */
    });
}

function createLambdaFunction() {

}




/*
var params = {
    Code: { /!* required *!/
        S3Bucket: 'STRING_VALUE',
        S3Key: 'STRING_VALUE',
        S3ObjectVersion: 'STRING_VALUE',
        ZipFile: new Buffer('...') || 'STRING_VALUE' /!* Strings will be Base-64 encoded on your behalf *!/
    },
    FunctionName: 'STRING_VALUE', /!* required *!/
    Handler: 'STRING_VALUE', /!* required *!/
    Role: 'STRING_VALUE', /!* required *!/
    Runtime: nodejs | nodejs4.3 | nodejs6.10 | nodejs8.10 | java8 | python2.7 | python3.6 | dotnetcore1.0 | dotnetcore2.0 | nodejs4.3-edge | go1.x, /!* required *!/
    DeadLetterConfig: {
    TargetArn: 'STRING_VALUE'
},
Description: 'STRING_VALUE',
    Environment: {
    Variables: {
        '<EnvironmentVariableName>': 'STRING_VALUE',
        /!* '<EnvironmentVariableName>': ... *!/
    }
},
KMSKeyArn: 'STRING_VALUE',
    MemorySize: 0,
    Publish: true || false,
    Tags: {
    '<TagKey>': 'STRING_VALUE',
    /!* '<TagKey>': ... *!/
},
Timeout: 0,
    TracingConfig: {
    Mode: Active | PassThrough
},
VpcConfig: {
    SecurityGroupIds: [
        'STRING_VALUE',
        /!* more items *!/
    ],
        SubnetIds: [
        'STRING_VALUE',
        /!* more items *!/
    ]
}
};
lambda.createFunction(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});*/
