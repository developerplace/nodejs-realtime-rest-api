const
  gulp = require('gulp'),
  del = require('del'),
  ghPages = require('gulp-gh-pages')
  gulpTypedoc = require('gulp-typedoc'),
  spawn = require('cross-spawn'),
  tsc = require('gulp-typescript'),
  config = require('../../gulpfile.config')
  ;


/**
 * Remove all generated docs.
 */
function clean() {
  return del([config.docsPath]);
}
module.exports.clean = clean;
gulp.task('docs-clean', clean);

function build(done) {
  spawn.sync('npm', ['run', 'docs'], { stdio: 'inherit' });
  done();
}

/**
 * Generate typedoc documents
 */
// function build() {
//   return tsProject.src()
//     // .src([config.tsSourceFiles])
//     .pipe(gulpTypedoc({
//       // TypeScript options
//       module: "commonjs",
//       includeDeclarations: false,
//       exclude: "./**/*+(index|.spec|.test|.e2e).ts",

//       // TypeDoc options (see typedoc docs)
//       out: config.docsPath,
//       mode: "file",
//       excludeExternals: true,
//       moduleResolution: 'node',
//       excludeNotExported: false,
//       ignoreCompilerErrors: false,
//       version: true
//     }))
//     ;
// }
module.exports.build = build;
gulp.task('docs-build', build);

/**
 * Publish typedoc documents to gh-pages
 */
function publish() {
  return gulp
    .src(config.docsFiles)
    .pipe(ghPages())
    ;
}
module.exports.publish = publish;
gulp.task('docs-publish', publish);
