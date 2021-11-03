const
  gulp = require('gulp'),
  del = require('del'),
  config = require('../../gulpfile.config')
  ;

function clean() {
  const f = config.statics.map(x => x.targetPath);
  return del(f);
}
module.exports.clean = clean;
gulp.task('statics-clean', clean);

async function postBuild() {
  for (const iterator of config.statics) {
    await getCopyStream(iterator.sourcePath, iterator.targetPath, { dot: true });
  }
}
module.exports.postBuild = postBuild;
gulp.task('statics-copy', postBuild);

async function getCopyStream(source, target, opts) {
  const stream = gulp
    .src(source, opts)
    .pipe(gulp.dest(target));

  return new Promise(function (resolve, reject) {
    stream.on('end', () => resolve(stream));
    stream.on('error', e=> reject(e));
  });
}

// gulp.task('statics-copy')();
// postBuild();