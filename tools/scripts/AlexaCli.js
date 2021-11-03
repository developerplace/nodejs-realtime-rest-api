const execa = require('execa');
const fs = require('fs')
const path = require('path');
const rimraf = require("rimraf");
// const PackageGenerator = require('./PackageGenerator');
// const BuildModes = require('./BuildModes');

const defaults = {
  packageFileName: 'package.json',
  outDir: [
    'dist', 'skill'
  ],
  tmpPath: 'tmp'
}
class AlexaCli {
  constructor(rootPath) {
    console.log(__dirname);
    this.rootPath = rootPath
    // this.rootPath = this.getPath(...rootPath.slice(1));
  }

  generatePackageJson() {
    let packageObject = this.getJsonFile(defaults.packageFileName);
    delete packageObject.devDependencies;
    let packageString = JSON.stringify(packageObject, undefined, 2);
    const targetPath = this.getPath(...defaults.outDir, defaults.packageFileName);

    fs.writeFileSync(targetPath, packageString);
    console.log(`Package.json '${targetPath}' generated`);
  }

  // const currentMode = BuildMode.dev;

  installDependencies() {
    const result = execa.sync(
      'npm',
      [
        'install',
        '--prefix',
        this.getPath(...defaults.outDir),
        this.getPath(...defaults.outDir)
      ],
      { cwd: this.cloneSkill.rootPath, stdio: 'pipe' }

    );
    console.log(result);
  }

  /**
   * ask api update-model [-s|--skill-id <skillId>] [-f | --file <fileName>] [-l|--locale <locale>] [-p|--profile <profile>] [-g|--stage <stage>] [--debug]
   * 
   * ask api update-skill 
   * -s amzn1.ask.skill.7263d4b3-4cef-4ae6-9691-12e2bdd2bdb0 
   * --stage development 
   * --file skill.json
   */
  updateSkill(skillId, skillFileName = 'skill.json') {
    const file = this.getPath(skillFileName);
    const result = execa.sync(
      'ask',
      [
        'api',
        'update-skill',
        '-s',
        skillId,
        '--stage',
        'development',
        '--file',
        file
      ],
      { cwd: this.rootPath, stdio: 'pipe' }

    );
    console.log(result.stdout);
  }

  /**
   * ask api update-model 
   * [-s|--skill-id <skillId>] 
   * [-f | --file <fileName>] 
   * [-l|--locale <locale>] 
   * [-p|--profile <profile>] 
   * [-g|--stage <stage>]
   */
  updateModel(skillId, locale = "de-DE", modelsPath = 'models') {
    const file = this.getPath(modelsPath, `${locale}.json`);
    const result = execa.sync(
      'ask',
      [
        'api',
        'update-model',
        '-s',
        skillId,
        '--file',
        file,
        '--locale',
        locale,
        '--stage',
        'development'
      ],
      { cwd: this.rootPath, stdio: 'pipe' }

    );
    console.log(result.stdout);
  }

  cloneSkill(skillId, locale = "de-DE") {
    // const functionInfo = JSON.parse(result.stdout);
    const tmpPath = this.getPath(defaults.tmpPath);

    const result = execa.sync(
      'ask',
      ['clone', '-s', skillId],
      { cwd: tmpPath, stdio: 'pipe' }

    );

    console.log(result.stdout);

    const getDirectories = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory());
    const dirs = getDirectories(tmpPath);

    // console.log(result);
    // console.log(dirs[0]);

    const skill = JSON.parse(fs.readFileSync(path.join(tmpPath, dirs[0], 'skill.json')));
    const skillName = skill.manifest.publishingInformation.locales[locale].name;
    const targetPath = path.join(tmpPath, skillName);

    if (targetPath !== path.join(tmpPath, dirs[0])) {
      rimraf.sync(targetPath);
      fs.renameSync(path.join(tmpPath, dirs[0]), targetPath);
    }
    console.log(`${skillName} (${locale}) cloned`);

  }

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

// console.log(cli.getJsonFile(defaults.packageFileName));


// const currentMode = BuildMode.dev;


module.exports = AlexaCli;