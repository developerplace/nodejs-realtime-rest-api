const
  gulp = require('gulp'),
  del = require('del'),
  tsc = require('gulp-typescript'),
  sourcemaps = require('gulp-sourcemaps'),
  config = require('../../gulpfile.config')
  ;

const tsProject = tsc.createProject('tsconfig.json');

const keys = {
  build: 'build',
  clean: 'build-clean',
  // compile: 'build-compile',
  watch: 'build-watch'
};
module.exports.keys = keys;

/**
 * Remove all generated JavaScript files from TypeScript compilation.
 */
function clean() {
  return del([config.targetPath]);
}
module.exports.clean = clean;
gulp.task(keys.clean, clean);

/**
 * Compile TypeScript
 */
function build() {

  var tsResult = tsProject.src()
    .pipe(sourcemaps.init())
   .pipe(tsProject());

  tsResult.dts.pipe(gulp.dest(config.targetPath));

  return tsResult.js
    .pipe(sourcemaps.write('.', { sourceRoot: './', includeContent: false }))
    .pipe(gulp.dest(config.targetPath))
    ;
}
module.exports.build = build;
gulp.task(keys.build, build);

/**
 * Watch for changed TypeScript files
 */
function watch() {
  return gulp.watch([config.tsSourceFiles], gulp.series(keys.compile));
}
module.exports.watch = watch;
gulp.task(keys.watch, watch);

/**
 * Build series
 */
// const cleanAndBuild = [
//   clean,
//   compile
// ];
// module.exports.cleanAndBuild = cleanAndBuild;
// gulp.task(keys.build,
//   gulp.series(build)
// );
