const
  gulp = require('gulp'),
  spawn = require('cross-spawn'),
  GitWrapper = require('dotup-ts-git-wrapper').GitWrapper,
  config = require('../../gulpfile.config')
  ;

async function publish() {
  const git = new GitWrapper();
  if (git.hasChanges()) {
    throw new Error('Can not be published with local changes. Commit and push first.');
  }

  spawn.sync('npm', ['publish'], { stdio: 'inherit' });
}
module.exports.publish = publish;

async function link() {
  config.npmLink.forEach(item => {
    const projectToLinkPath = path.join(config.rootPath, item.path, item.name);
    // Call 'npm link' in the project path
    spawn.sync('npm', ['link'], { stdio: 'inherit', cwd: projectToLinkPath });
    // Callm 'npm link projectname' in root path
    spawn.sync('npm', ['link', item.name], { stdio: 'inherit', cwd: config.rootPath });
  });
}
module.exports.link = link;
gulp.task('npm-link', link);

// module.exports.postBuild = publish;
// gulp.task('npm-publish',
//   gulp.series(
//     build.build,
//     publish
//   )
// );
