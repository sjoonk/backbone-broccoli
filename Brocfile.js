// Brocfile.js
// Reference: https://github.com/broccolijs/broccoli-sample-app/blob/master/Brocfile.js

module.exports = (function() {

    // dependencies
    var concat = require('broccoli-concat');
    var compileSass = require('broccoli-sass');
    var pickFiles = require('broccoli-static-compiler');
    // var findBowerTrees = require('broccoli-bower');
    var mergeTrees = require('broccoli-merge-trees');

    // concat the JS
    var scripts = concat('app/scripts', {
        inputFiles: ['**/*.js'],
        outputFile: '/assets/scripts.js'
    });


    // concat dependencies
    // var deps = pickFiles('bower_components', {
    //     srcDir: '/',
    //     destDir: '/deps'
    // });

    var deps = concat('bower_components', {
        inputFiles: [
            'jquery/dist/jquery.js',
            'underscore/underscore.js',
            'backbone/backbone.js'
        ],
        outputFile: '/assets/deps.js'
    });


    // compile the SASS
    var styles = compileSass(['app/styles'], 'main.scss', 'assets/styles.css');


    // merge all the trees together
    var tree = mergeTrees([deps, scripts, styles, 'app']);
    return tree;

})();