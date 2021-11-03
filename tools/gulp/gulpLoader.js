'use strict';
const
  fs = require('fs'),
  path = require('path'),
  gulp = require('gulp'),
  taskEnabled = require('./gulp.json'),
  config = require('../../gulpfile.config')
  ;

const processNames = {
  clean: 'clean',
  preBuild: 'preBuild',
  build: 'build',
  postBuild: 'postBuild',
  prePublish: 'prePublish',
  publish: 'publish',
  postPublish: 'postPublish',
  watch: 'watch'
};

class GulpLoader {

  constructor() {
    this.processNames = processNames;
    // Gulp files
    this.gulps = [];
  }


  getProcessSerie(buildMode, processName) {
    const procs = this.getProcess(processName);
    if (procs.length > 0) {
      return gulp.series(this.switchBuildMode(buildMode), ...procs);
    } else {
      return undefined;
    }
  }

  switchBuildMode(mode) {
    return async function () {
      config.buildMode = mode;
      return Promise.resolve();
    };
  }

  task(name, taskFunction) {
    return gulp.task(name, taskFunction);
  }

  getProcess(processName) {
    const result = [];
    const activeGulps = this.gulps; // .filter(g => config[path.basename(g, '.js')] === true);

    switch (processName) {
      case processNames.watch:

        this.addProcess(activeGulps, this.processNames.watch, result);

        break;

      case processNames.build:
      case processNames.publish:

        this.addProcess(activeGulps, this.processNames.clean, result);
        this.addProcess(activeGulps, this.processNames.preBuild, result);
        this.addProcess(activeGulps, this.processNames.build, result);
        this.addProcess(activeGulps, this.processNames.postBuild, result);

        break;

    }

    // Add publish functions..
    if (processName === processNames.publish) {
      this.addProcess(activeGulps, this.processNames.prePublish, result);
      this.addProcess(activeGulps, this.processNames.publish, result);
      this.addProcess(activeGulps, this.processNames.postPublish, result);
    }

    return result;
  }

  addProcess(activeGulps, processName, result) {
    let foos = activeGulps.filter(file => file[processName] !== undefined).map(file => file[processName]);
    if (foos.length > 0) {
      result.push(foos);
    }
  }

  loadAllFiles() {
    const gulpFiles = fs.readdirSync('./tools/gulp').filter(file => path.extname(file) === '.js');
    gulpFiles.forEach(file => {
      if (taskEnabled[path.basename(file, '.js')] === true) {
        console.log(`GulpLoader loading ${file}''`);

        this.gulps.push(require('./' + file));
      }
    });
  }

}
module.exports = GulpLoader;
