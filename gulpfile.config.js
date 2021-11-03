'use strict';
//const skill = require('./secrets/skill.config.json');
const BuildMode = require('./tools/gulp/gulpBuildMode');

const Paths = {
  // source
  sourcePath: 'src',

  // test
  testPath: 'test',

  // target
  targetPath: 'dist',

  // docs
  docsPath: 'docs'
}

const GulpConfig =  {

  buildMode: BuildMode.dev,

  // Root path
  rootPath: __dirname,

  // source
  sourcePath: Paths.sourcePath,
  tsSourceFiles: Paths.sourcePath + '/**/*.ts',

  // test
  testPath: Paths.testPath,
  testFiles: `${Paths.testPath}/**/*.ts`,

  // target
  targetPath: Paths.targetPath,

  // docs
  docsPath: Paths.docsPath,
  docsFiles: Paths.docsPath + '/**/*',

  // Static files
  statics: [
    {
      sourcePath: `${Paths.sourcePath}/assets/**`,
      targetPath: `${Paths.targetPath}/assets`
    }
  ],

  npmLink: [
    // {
    //   name: 'module-name1',
    //   path: '../'
    // },
    // {
    //   name: 'module-name2',
    //   path: '../'
    // }
  ]
  // lambda: [
  //   {
  //     sourcePath: `${Paths.targetPath}/skill`,
  //     targetFile: `${Paths.targetPath}/lambda.zip`,
  //     params: {
  //       FunctionName: skill.functionArn,
  //       Publish: false
  //     }
  //   }
  // ]
}

module.exports = GulpConfig;
