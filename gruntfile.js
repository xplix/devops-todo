
module.exports = function (grunt) {
    const sass = require('node-sass');
    const mozjpeg = require('imagemin-mozjpeg');
 
    require('time-grunt')(grunt);
 
    require('load-grunt-tasks')(grunt);
 
grunt.initConfig({
    sass: {
        options: {
            implementation: sass,
            sourceMap: true
        },
        dist: {
            files: {
                'assets/css/style.css': 'assets/scss/style.scss'
            }
        }
    }
});
 
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
 
    grunt.registerTask('default', ['sass', 'concat', 'cssmin', 'uglify', 'imagemin']);
 };
 