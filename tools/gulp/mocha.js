const
  gulp = require('gulp'),
  tsc = require('gulp-typescript'),
  mocha = require('gulp-mocha'),
  config = require('../../gulpfile.config')
  ;

function preBuild() {
  return gulp
    .src(config.testFiles)
    .pipe(
      mocha(
        {
          reporter: 'spec',
          require: ['ts-node/register']
        }
      )
    );
}
module.exports.preBuild = preBuild;

gulp.task('test-mocha', preBuild);

// exports['test-mocha'] = run;
// task('test-mocha', function () {
//   return gulp.src(config.testFiles)
//     .pipe(mocha(
//       {
//         reporter: 'spec',
//         require: ['ts-node/register']
//       }
//     ))
//     ;
// });
