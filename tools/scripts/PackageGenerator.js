// const fs = require('fs');
// const path = require('path');
// const BuildMode = require('./BuildModes');

// class PackageGenerator {
//   constructor(rootPath, buildMode, template, config, target) {
//     this.buildMode = buildMode || BuildMode.dev;
//     this.packageTemplate = template || path.join(rootPath, 'package.json');
//     this.config = config || path.join(rootPath, 'secrets', 'package.config.json');
//     this.target = target || path.join(rootPath, 'package.json');
//     console.log('Starting package generator');
//   }

//   // generatePackageFile(buildMode) {
//   //   const mode = buildMode || this.buildMode;

//   //   console.log(`template file: ${this.packageTemplate}`);

//   //   const template = JSON.parse(fs.readFileSync(this.packageTemplate));

//   //   this.replaceDependencies(mode, template);
//   //   // const allConfigDeps = config[mode].dependencies;

//   //   // allConfigDeps.forEach(item => {
//   //   //   template.dependencies[item.name] = item.path;
//   //   // });

//   //   let data = JSON.stringify(template, undefined, 2);
//   //   fs.writeFileSync(this.target, data);
//   //   console.log(`package file ${this.target} generated (${mode})`);
//   // }

//   // replaceDependencies(buildMode, packageObject) {
//   //   const config = JSON.parse(fs.readFileSync(this.config));

//   //   const allConfigDeps = config[buildMode].dependencies;

//   //   allConfigDeps.forEach(item => {
//   //     packageObject.dependencies[item.name] = item.path;
//   //   });

//   //   // let data = JSON.stringify(template, undefined, 2);
//   // }

// }

// module.exports = PackageGenerator;
