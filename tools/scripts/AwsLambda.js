'use strict';
const AWS = require('aws-sdk');
const AwaitThenable = require('../AwaitThenable');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

class AwsLambda {

  constructor(rootPath, region, profile) {
    this.rootPath = rootPath || '';
    this.region = region || 'eu-west-1';
    this.profile = profile || 'default';
  }

  getLambda() {
    return new AWS.Lambda(
      {
        region: this.region
      }
    );
  }

  async functionExists(functionName) {

    const lambda = this.getLambda();

    return new Promise((resolve, reject) =>

      lambda.getFunction(
        {
          FunctionName: functionName
        }
      ).promise().then(
        data => {
          resolve(true);
        },
        err => {
          if (err.statusCode === 404) {
            resolve(false);
          } else {
            reject(err);
          }
        }
      )

    );

  }

  async updateFunctionCode(lambdaConfig) {

    const fileContent = fs.readFileSync(this.getPath(lambdaConfig.targetFile));
    const buffer = Buffer.from(fileContent);

    const lambda = this.getLambda();

    return new Promise((resolve, reject) =>

      lambda.updateFunctionCode(
        {
          FunctionName: lambdaConfig.params.FunctionName,
          Publish: lambdaConfig.params.Publish,
          ZipFile: buffer
        }
      ).promise().then(
        data => {
          resolve(true);
        },
        err => {
          if (err.statusCode === 404) {
            resolve(false);
          } else {
            reject(err);
          }
        }
      )

    );

  }

  async pack(lambdaConfig) {
    const archive = archiver('zip');
    const stream = fs.createWriteStream(this.getPath(lambdaConfig.targetFile));

    return new Promise((resolve, reject) => {
      archive
        .directory(this.getPath(lambdaConfig.sourcePath), false)
        .on('error', err => reject(err))
        .pipe(stream)
        ;

      stream.on('close', () => resolve());
      archive.finalize();
    });
  }

  getPath(...paths) {
    var args = Array.isArray(paths) ? paths : Array.from(paths);
    let result = this.rootPath;
    args.forEach(element => {
      result = path.join(result, element);
    });
    return result;
  }

  // async createFunction(functionName) {

  //   const lambda = this.getLambda();

  //   return new Promise((resolve, reject) =>

  //     lambda.getPolicy().createFunction(
  //       {
  //         FunctionName: functionName,
  //         Code: {
  //         },
  //         Description: "",
  //         FunctionName: "MyFunction",
  //         Handler: "index.handler",
  //         MemorySize: 128,
  //         Publish: true,
  //         Role: "arn:aws:iam::123456789012:role/service-role/role-name", // replace with the actual arn of the execution role you created
  //         Runtime: "nodejs8.10",

  //       }
  //     ).promise().then(
  //       data => resolve(data),
  //       err => reject(err)
  //     )

  //   );

  // }

}

module.exports = AwsLambda;
