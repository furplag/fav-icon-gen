module.exports = function(grunt) {
  'use strict';

  // Force use of Unix newlines
  grunt.util.linefeed = '\n';

  RegExp.quote = function(string) {
    return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var path = require('path');

  grunt.initConfig({

    // Metadata.
    pkg : grunt.file.readJSON('package.json'),
    banner : '/*!\n'
      + ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.homepage %>)\n'
      + ' * Copyright 2014+ <%= pkg.author %>\n'
      + ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n'
      + ' * <%= pkg.description %>\n' + ' */\n',

    realFavicon: {
      favicons: {
        src: 'src/image.png',
        dest: 'build/images',
        options: {
          iconsPath: '/',
          html: [ 'dist/demo.html' ],
          design: {
            ios: {
              pictureAspect: 'backgroundAndMargin',
              backgroundColor: '#efefef',
              margin: '4%',
              assets: {
                ios6AndPriorIcons: false,
                ios7AndLaterIcons: true,
                precomposedIcons: true,
                declareOnlyDefaultIcon: true
              }
            },
            desktopBrowser: {},
            windows: {
              pictureAspect: 'noChange',
              backgroundColor: '#2d89ef',
              onConflict: 'override',
              assets: {
                windows80Ie10Tile: true,
                windows10Ie11EdgeTiles: {
                  small: true,
                  medium: true,
                  big: true,
                  rectangle: true
                }
              }
            },
            androidChrome: {
              pictureAspect: 'backgroundAndMargin',
              margin: '0%',
              backgroundColor: '#efefef',
              themeColor: '#efefef',
              manifest: {
                display: 'standalone',
                orientation: 'notSet',
                onConflict: 'override',
                declared: true
              },
              assets: {
                legacyIcon: false,
                lowResolutionIcons: false
              }
            },
            safariPinnedTab: {
              pictureAspect: 'silhouette',
              themeColor: '#5bbad5'
            }
          },
          settings: {
            compression: 2,
            scalingAlgorithm: 'Lanczos',
            errorOnImageTooSmall: false
          }
        }
      }
    },

    clean : {
      dist : 'build',
    },

    tinypng : {
      options : {
        apiKey : "",
        checkSigs : false,
        debug : true,
        showProgress : true,
        sigFile : "",
        stopOnImageError : true,
        summarize : true
      },
      dist : {
        src : '*.png',
        cwd : 'build/images/',
        dest : 'build/images/optimized/',
        expand : true,
        rename : function(dest, src) {
          return path.join(dest, src.split('/').pop())
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  require('load-grunt-tasks')(grunt, {scope : 'devDependencies'});
  require('time-grunt')(grunt);

  // Default task.
  grunt.registerTask('default', [ 'realFavicon' ])
};
