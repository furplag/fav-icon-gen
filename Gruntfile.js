module.exports = function (grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  var taskConfig = grunt.file.readJSON('./grunt/taskConfig.json', { encoding: 'utf8' });
  var path = require('path');

  grunt.initConfig({

    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    clean: {
      dist: 'build'
    },

    copy: {
      build: {
        src: ['src/firefoxManifest.webapp'],
        dest: 'build/firefoxManifest.webapp'
      }
    },

    favicons: {
      options: taskConfig.favicons,
      dist: {
        src: 'src/image.png',
        dest: 'build/img'
      }
    },

    tinypng: {
      options: taskConfig.tinypng,
      dist: {
        src: '*.png',
        cwd: 'build/img/',
        dest: 'build/img/optimized/',
        expand: true,
        rename: function (dest, src) {
          return path.join(dest, src.split('/').pop())
        }
      }
    }
  });

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });
  require('time-grunt')(grunt);
}
