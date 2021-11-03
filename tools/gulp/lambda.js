const
  gulp = require('gulp'),
  del = require('del'),
  AwsLambda = require('../scripts/AwsLambda'),
  config = require('../../gulpfile.config'),
  path = require('path')
  ;

const rootPath = path.join(__dirname, '..', '..');

// const config = new Config();

// const functionArn = "arn:aws:lambda:eu-west-1:977739547106:function:alexa-gjame-schneeballschlacht";
// const functionArn = "arn:aws:lambda:eu-west-1:977739547106:function:test-function"; // "arn:aws:lambda:eu-west-1:977739547106:function:alexa-gjame-schneeballschlacht";
/* 
  "functionArn": "arn:aws:lambda:eu-west-1:977739547106:function:alexa-game-schneeballschlacht",
  "lambdaRegion": "eu-west-1",
*/
async function publish() {
  const lambda = new AwsLambda(rootPath);

  const lambdaFunctions = config.lambda;

  for (const lambdaConfig of lambdaFunctions) {
    await lambda.pack(lambdaConfig);
    const x = await lambda.functionExists(lambdaConfig.params.FunctionName);
    await lambda.updateFunctionCode(lambdaConfig);
  }
}

module.exports.publish = publish;
gulp.task('aws-publish', publish);
