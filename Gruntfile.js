'use strict';

module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            unzip: ['modules']
        },

        titaniumifier: {
            module: {
                src: '.',
                dest: 'dist'
            }
        },

        unzip: {
            module: {
                src: 'dist/com.sensimity.ti.capabilityalert-commonjs-<%= pkg.version %>.zip',
                dest: '../../Koophetlokaal/Koophetlokaal-app/'
            }
        },

        watch: {
            js: {
                files: [
                    './index.js'
                ],
                tasks: [
                    'titaniumifier:module',
                    'unzip'
                ]
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-titaniumifier');
    grunt.loadNpmTasks('grunt-titanium');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('build', ['titaniumifier:module']);
    grunt.registerTask('test', ['unzip:module', 'clean:unzip']);

    grunt.registerTask('default', ['clean', 'build', 'test']);
};