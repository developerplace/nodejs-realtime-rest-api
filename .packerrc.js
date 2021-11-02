/**
 * Packer base configuration object.
 */
module.exports = {
  /**
   * Extend with packer base config
   * @type {string}
   * @default '~/packer-cli/resources/static/.packerrc.base.js'
   */
  extend: '~/packer-cli/resources/static/.packerrc.base.js',

  /**
   * Entry source file.
   * @type {string}
   * @default 'index.js'
   */
  entry: 'index.js',

  /**
   * Source directory.
   * @type {string}
   * @default 'src'
   */
  source: 'src',

  /**
   * Build artifact output directory
   * @type {string}
   * @default 'dist'
   */
  dist: 'dist',

  /**
   * Watch and build temporary file directory
   * @type {string}
   * @default '.tmp'
   */
  tmp: '.tmp',

  /**
   * Packer compiler options
   */
  compiler: {

    /**
     * Dependency map mode option in target package.json file.
     * - 'cross-map-peer-dependency' : Map project dependencies to target peerDependencies
     * - 'cross-map-dependency' : Map project peerDependencies to target dependencies
     * - 'map-dependency' : Map project dependencies to target dependencies
     * - 'map-peer-dependency' : Map project peer dependencies to target peerDependencies
     * - 'all' - Map both peerDependencies and dependencies to target peerDependencies and dependencies
     * @type {string}
     * @default 'cross-map-peer-dependency'
     */
    dependencyMapMode: 'cross-map-peer-dependency',

    /**
     * Specified package fields will be copied to target package.json file.
     * @type {Array<string>}
     * @default [ 'name', 'version', 'description', 'keywords', 'author', 'repository', 'license', 'bugs', 'homepage' ]
     */
    packageFieldsToCopy: [
      'name',
      'version',
      'description',
      'keywords',
      'author',
      'repository',
      'license',
      'bugs',
      'homepage'
    ],

    /**
     * If true, a separate sourcemap file will be created. If inline, the sourcemap will be appended to
     * the resulting output file as a data URI.
     * @type {(boolean|string)}
     * @default true
     */
    sourceMap: true,

    /**
     * Custom rollup plugin extractor callback.
     * @callback customRollupPluginExtractorCallback
     * @param {string} buildType - 'bundle'|'es5'|'esnext'
     * @param {string} packerConfig - Packer configuration object.
     * @return {Array<{}>} Custom rollup plugin collection
     */

    /**
     * Extract custom rollup plugins to be executed while building the target artifacts.
     * @type {(null|customRollupPluginExtractorCallback)}
     */
    customRollupPluginExtractor: null,

    /**
     * Compile build target config.
     * @type {{}}
     * @default {}
     */
    build: {

      /**
       * Generate flat bundle minified build artifact.
       * @type {boolean}
       * @default true
       */
      bundleMin: true,

      /**
       * Generate flat es5 build artifact based on .babelrc es5 environment configuration.
       * @type {boolean}
       * @default false
       */
      es5: false,

      /**
       * Generate flat es5 minified build artifact.
       * @type {boolean}
       * @default false
       */
      es5Min: false,

      /**
       * Generate flat esnext build artifact based on .babelrc esnext environment configuration.
       * @type {boolean}
       * @default true
       */
      esnext: true,

      /**
       * Generate flat esnext minified build artifact.
       * @type {boolean}
       * @default true
       */
      esnextMin: true
    },

    /**
     * Library compile mode.
     * - 'browser' : Browser/NodeJS compliant module.
     * - 'node' : NodeJS only module.
     * - 'node-cli' : Node CLI module.
     * @type {string}
     * @default 'browser'
     */
    buildMode: 'node',

    /**
     * Script compile configuration.
     * @type {{}}
     * @default {}
     */
    script: {

      /**
       * Script preprocessor.
       * - 'typescript' : use typescript preprocessor to transpile source.
       * - 'none': do not use any script preprocessor to transpile source.
       * @type {string}
       * @default 'none'
       */
      preprocessor: 'none',

      /**
       * Directory to copy typescript typescript definition files of target build if typescript preprocessor is used.
       * Path relative to dist directory. Empty string denote copy to distribution root.
       * @type {string}
       * @default 'typings'
       */
      tsd: 'typings',

      /**
       * Script required image compile configuration.
       * set false if not required to inline images
       * @type {({}|false)}
       * @default {}
       */
      image: {

        /**
         * Inline image if image size is less than or equal to specified limit.
         * @type {number}
         * @default 1000000
         */
        inlineLimit: 1000000,

        /**
         * Large image output directory within distribution directory.
         * @type {string}
         * @default 'images'
         */
        outDir: 'images'
      },
    },

    /**
     * Style compile configuration.
     * Set false if styles are not supported.
     * @type {({}|false)}
     * @default {}
     */
    style: false,

    /**
     * Run bundle build tasks concurrently to improve performance if true
     * @type {boolean}
     * @default true
     */
    concurrentBuild: true
  },

  /**
   * List of paths which contains static assets referenced in style sheets.
   * Paths should be relative to project root.
   * @type {Array<string>}
   * @default []
   */
  assetPaths: [
    'src/assets'
  ],

  /**
   * List of files paths to copy on build.
   * Paths should be relative to project root.
   * @type {Array<string>}
   * @default [ 'README.md', 'LICENSE' ]
   */
  copy: [
    'README.md',
    'LICENSE'
  ],

  /**
   * Prevent a module from showing up in the output bundle. You will get export default {} instead.
   * @type {Array<string>}
   * @default []
   */
  ignore: [],

  /**
   * Custom rollup plugin extractor callback.
   * @callback pathReplaceCallback
   * @param {string} code - code segment
   * @param {string} id - file path/identifier.
   * @return {string} transformed code.
   */

  /**
   * Path Replace pattern object type.
   * @typedef {Object} PathReplacePattern
   * @property {(string|string[])} include - whitelist patterns to match.
   * @property {(string|string[])} exclude - blacklist patterns avoid matching.
   * @property {(string|RegExp)} test - test expression or string.
   * @property {string} replace - string to replace the match.
   * @property {RegExp} match - regexp match with resolved path.
   * @property {string} text - replace content with given text.
   * @property {string} file - replace with given file relative to project root.
   * @property {pathReplaceCallback} transform - path replace function.
   */

  /**
   * Import path replace pattern collection.
   * @type {Array<PathReplacePattern>}
   * @default []
   */
  replacePatterns: [
    {
      /**
       * Check only within include glob.
       * @type {(string|string[])}
       * @default ''
       */
      include: 'src/**',

      /**
       * Test path identifier string or regular expression.
       * @type {(string|RegExp)}
       * @default ''
       */
      test: './config/base-config',

      /**
       * Replace path string.
       * @type {string}
       * @default ''
       */
      replace: './config/replace-config'
    }
  ],

  /**
   * Bundle artifact build configuration.
   * @type {{}}
   */
  bundle: {

    /**
     * Bundle output external dependencies (dependency modules to treat as externals).
     * Refer rollup options for more info.
     * @type {Array<string>}
     * @default []
     */
    externals: [
      'regenerator-runtime/**',
      '@babel/runtime/**',
      '@babel/runtime-corejs3/**',
      'handlebars/runtime'
    ],

    /**
     * Bundle output global dependencies (dependency modules to tread as globals).
     * Refer rollup options for more info.
     * @type {{}}
     * @default {}
     */
    globals: {},

    /**
     * Treat globals as externals if true
     * @type {boolean}
     * @default true
     */
    mapExternals: true,

    /**
     * Browser compliant bundle modules formats (based on .babelrc bundle environment configuration)
     * - 'umd' – Universal Module Definition, works as amd, cjs and iife all in one
     * - 'amd' – Asynchronous Module Definition, used with module loaders like RequireJS
     * - 'iife' – A self-executing function, suitable for inclusion as a DOM script tag. (If you want to create a bundle
     * for your application, you probably want to use this, because it leads to smaller file sizes.)
     * - 'system' - Native format of SystemJS loader
     *
     * NodeJS only bundle module formats
     * 'cjs' – CommonJS, suitable for Node and Browserify/Webpack
     * 'esm' – Keep the bundle as an ES module file
     * @type {string}
     * @default 'umd'
     */
    format: 'cjs',

    /**
     * Library global scope namespace (only applicable for browser compliant).
     * @type {string}
     * @default 'com.lib'
     */
    namespace: '',

    /**
     * AMD flat bundle configuration
     * @type {{}}
     * @default {}
     */
    amd: {

      /**
       * AMD flat bundle define function name
       * @type {string}
       * @default ''
       */
      define: '',

      /**
       * AMD flat bundle module identifier name
       * @type {string}
       * @default ''
       */
      id: ''
    }
  },

  /**
   * Unit test configuration.
   * @type {{}}
   */
  test: {

    /**
     * Unit test framework
     *  - 'jasmine' - https://jasmine.github.io/
     *  - 'mocha' - https://mochajs.org/
     *  - 'jest' - https://jestjs.io/
     * @type {string}
     * @default 'jasmine'
     */
    framework: 'mocha',

    /**
     * Unit test environment.
     * - 'node' - node unit test environment with jsdom.
     * - 'browser' - browser based unit test environment with karma.
     * @type {string}
     * @default 'node'
     */
    environment: 'node'
  },

  /**
   * Watch mode serve configuration.
   * Set false if not required to serve on watch build.
   * @type {({}|false)}
   * @default {}
   */
  serve: false,

  /**
   * Bundle license configuration
   * @type {{}}
   * @default {}
   */
  license: {

    /**
     * Include inline header banner parsed via .packer/.banner.hbs template to build artifacts.
     * @type {boolean}
     * @default true
     */
    banner: true
  },

  /**
   * Code auto format configuration.
   * Auto format with https://prettier.io
   * @type {{}}
   * @default {}
   */
  format: {
    /**
     * File extensions to auto format.
     * @type {string[]}
     * @default [ 'js', 'jsx', 'ts', 'tsx', 'html', 'scss', 'css', 'less', 'json' ]
     */
    extensions: [ 'js', 'jsx', 'ts', 'tsx', 'html', 'scss', 'css', 'less', 'json' ]
  }
};
