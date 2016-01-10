module.exports = function (grunt) {
  var browsers = [{
    browserName: 'firefox',
    version: '43',
    platform: 'MAC'
  }, {
    browserName: 'chrome',
    version: '47',
    platform: 'MAC'
  }];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          base: '',
          port: 9999
        }
      }
    },

    'saucelabs-jasmine': {
      all: {
        options: {
          urls: [
            'http://tifred.github.io/frontend-nanodegree-feedreader/dist/index.html'
          ],
          browsers: browsers,
          build: process.env.TRAVIS_JOB_ID,
          testname: 'jasmine tests',
          throttled: 1,
          sauceConfig: {
            'video-upload-on-pass': false
          }
        }
      }
    },
    watch: {}
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-saucelabs');

  grunt.registerTask('default', ['connect', 'saucelabs-jasmine']);
};
