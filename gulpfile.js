/**
 * dotup IT solutions. Peter Ullrich
 * 
 * The gulp tasks are split in several files in the tools/gulp directory.
 */
const GulpLoader = require('./tools/gulp/gulpLoader');
const BuildMode = require('./tools/gulp/gulpBuildMode');

// Load all gulp files.
const gulpLoader = new GulpLoader();
gulpLoader.loadAllFiles();

gulpLoader.task('project-build',
  gulpLoader.getProcessSerie(
    BuildMode.prod,
    gulpLoader.processNames.build
  )
);

gulpLoader.task('project-build-dev',
  gulpLoader.getProcessSerie(
    BuildMode.dev,
    gulpLoader.processNames.build
  )
);

gulpLoader.task('project-publish',
  gulpLoader.getProcessSerie(
    BuildMode.prod,
    gulpLoader.processNames.publish
  )
);

gulpLoader.task('project-publish-dev',
  gulpLoader.getProcessSerie(
    BuildMode.dev,
    gulpLoader.processNames.publish
  )
);

// gulp.task('project-watch', gulp.parallel(gulpLoader.getProcess(gulpLoader.processNames.watch)));
