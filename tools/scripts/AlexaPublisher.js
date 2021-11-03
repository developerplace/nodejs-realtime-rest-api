const fs = require('fs');
const path = require('path');
const BuildMode = require('./BuildModes');
// const PackageGenerator = require('./PackageGenerator');

class AlexaSkillPublisher {
  constructor(rootPath, template, config, target) {
    this.template = template || path.join(rootPath, 'skill.template.json');
    this.config = config || path.join(rootPath, 'secrets', 'skill.config.json');
    this.target = target || path.join(rootPath, 'skill.json');
    this.skillId = undefined;
    this.functionArn = undefined;
    this.lambdaRegion = undefined;
    this.endpoint = undefined;
    console.log('Starting skill minifest generator');
  }

  loadConfiguration(buildMode) {
    const skillConfig = JSON.parse(fs.readFileSync(this.config));
    const ep = skillConfig[buildMode].endpoint;

    this.skillId = skillConfig.skillId;
    this.functionArn = skillConfig.functionArn;
    this.lambdaRegion = skillConfig.lambdaRegion;
    this.endpoint = ep;

    console.log(`config file: ${this.config}`);
  }

  generateManifest(buildMode) {

    console.log(`template file: ${this.template}`);
    this.loadConfiguration(buildMode);

    const tf = JSON.parse(fs.readFileSync(this.template));
    tf.manifest.apis.custom.endpoint = this.endpoint;

    let data = JSON.stringify(tf, undefined, 2);
    fs.writeFileSync(this.target, data);
    console.log(`skill manifest ${this.target} generated (${buildMode})`);
  }

  // updatePackageFile(buildMode) {
  //   const packagePath = this.getPath('..', 'package.json');
  //   const packageFile = this.getJsonFile(packagePath);
  //   const pg = new PackageGenerator(this.rootPath)
  //   pg.replaceDependencies(buildMode, packageFile);

  //   fs.writeFileSync(packagePath, packageFile);
  // }

  getPath(...paths) {
    var args = Array.isArray(paths) ? paths : Array.from(paths);
    let result = this.rootPath;
    args.forEach(element => {
      result = path.join(result, element);
    });
    return result;
  }

  getJsonFile(...paths) {
    const fileName = this.getPath(...paths);
    const fileContent = JSON.parse(fs.readFileSync(fileName));
    return fileContent;
  }
}

module.exports = AlexaSkillPublisher;
