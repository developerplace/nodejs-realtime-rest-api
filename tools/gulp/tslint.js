const
  gulp = require('gulp'),
  tslint = require('gulp-tslint'),
  config = require('../../gulpfile.config')
  ;

/**
 * Lint all custom TypeScript files.
 */
gulp.task('ts-lint', function () {
  // var f = filter(['**/*.ts', '!**/template']);
  return gulp
    .src(config.tsSourceFiles)
    .pipe(
      tslint({
        configuration: "tslint.json",
        formatter: "stylish"
      })
    )
    .pipe(
      tslint.report({
        emitError: false,
        allowWarnings: true
      })
    )
    ;
});
