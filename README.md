#

>

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Getting started](#getting-started)
  - [Complete directory layout](#complete-directory-layout)
- [Technologies](#technologies)
- [How to use](#how-to-use)
- [Publishing your code](#publishing-your-code)
- [Changelog](#changelog)
- [How to contribute](#how-to-contribute)
- [How to make pull request](#how-to-make-pull-request)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install  --save
```

## Getting Started

- Run: `npm install` inside your project to install dependencies.
- Run: `npm install typings -g` (If [typings](https://www.npmjs.com/package/typings) is not installed before run this command)
- Run:`npm install gulp -g` to install [Gulp](https://www.npmjs.com/package/gulp) globally
- Follow the Complete Directory Layout to get to know about the project.

### Complete Directory Layout

```
.
├── /dist/                      # The folder for compiled output with typings for node module consume
├── /docs/                      # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code(.ts) of the application
│   ├── /sub_srcs               # Contain any sub sources(files or folders)
│   └── /index.ts               # Expose the acceseble properties by outside
├── /test/                      # Contain tests(.ts) for all the source files
├── /tools/                     # Tools configuration folder contains gulp files and others
├── .editorconfig               # Define and maintain consistent coding styles between different editors and IDEs
├── .gitattributes              # Defining attributes per path
├── .gitignore                  # Contains files to be ignored when pushing to git
├── .jshintrc                   # JShint rules for the project
├── .npmignore                  # Contains files to be ignored when pushing to npm
├── .npmrc                      # NPM config file
├── .travis.yml                 # Travis CI configuration file
├── CHANGELOG.md                # Detailed recent changes in the versions
├── CONTRIBUTING.md             # Shows how to contribute to your module
├── gulpfile.config.js          # Link all splittered gulp tasks configuration
├── gulpfile.js                 # Link all splittered gulp tasks
├── package.json                # Holds various metadata relevant to the project
├── PULL_REQUEST_TEMPLATE.md    # Shows how to make pull request to you project
├── README.md                   # Contains the details of the generated project
├── tsconfig.json               # Contains typescript compiler options
└── tslint.json                 # Lint rules for the project
```

## Technologies

| Usage                  | Technology       |
| ---------------------- | ---------------- |
| Javascript Framework   | Typescript       |
| Unit Testing Framework | Chai             |
| Documentation          | Typedoc          |
| Build Tool             | Gulp             |
| Code Quality Tools     | JS Hint, TS Lint |
| Dependency Registries  | YARN             |

## How to Use

Here is the list of tasks available out of the box and run these via `npm run <task>`

```
  build             Perform npm and bower build
  test              Run spec tests
  doc               Generate API Documentation
  gh-pages          Generate GitHub Pages
  clean             Cleans lib directory and bower directory
  watch             Watches ts source files and runs tslint, jshint on change
```

## Publishing Your Code

_Once your tests are passing (ideally with a Travis CI green run), you might be ready to publish your code to npm._

Bumping version number and tagging the repository with it can be done as mentioned below.
For more details read [http://semver.org/](http://semver.org/)

Available options to update version

```
npm run patch     # makes v0.1.0 → v0.1.1
npm run feature   # makes v0.1.1 → v0.2.0
npm run release   # makes v0.2.1 → v1.0.0
```

Publishing updated version can be done via,

```
npm run <release | feature | patch>
npm publish
```

## Changelog

Recent changes can be viewed on the [CHANGELOG.md](CHANGELOG.md)

## How to Contribute

Read to contribute [CONTRIBUTING.md](CONTRIBUTING.md)

[Referred via](https://github.com/joeybaker/generator-iojs)

## How to Make Pull Request

Read to contribute [PULL_REQUEST_TEMPLATE.md](PULL_REQUEST_TEMPLATE.md)

[Referred via](https://github.com/joeybaker/generator-iojs)

## License

Copyright (c) .
This source code is licensed under the Apache-2.0 license.
