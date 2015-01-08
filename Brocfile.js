// Brocfile.js

module.exports = (function() {

    // dependencies
    var concat = require('broccoli-concat');
    var compileSass = require('broccoli-sass');
    var pickFiles = require('broccoli-static-compiler');
    // var findBowerTrees = require('broccoli-bower');
    var mergeTrees = require('broccoli-merge-trees');

    // var _ = require('lodash');
    // var templateBuilder = require('broccoli-template-builder');
    // var wrapFiles = require('broccoli-wrap');

    var jst = require('broccoli-jst');

    // concat dependencies
    var deps = concat('bower_components', {
        inputFiles: [
            'jquery/dist/jquery.js',
            'underscore/underscore.js',
            'backbone/backbone.js'
        ],
        outputFile: '/assets/deps.js'
    });

    // build templates
    // var templates = templateBuilder('app/scripts/templates', {
    //     extensions: ['ejs'], // required
    //     outputFile: 'assets/templates.js', // required
    //     namespace: 'JST',      // optional (defaults to 'JST')
    //     compile: function(string) {
    //         return _.template(string).source;
    //     }
    // });
    
    // prepare scripts as tree
    var scripts = 'app/scripts';
    
    // compile JST (apply filter)
    scripts = jst(scripts, { extensions: ['ejs'] });
    
    // concat the JS
    scripts = concat(scripts, {
        inputFiles: [
            'main.js',
            'models/*.js',
            'collections/*.js',
            'templates/**/*.js',
            'views/**/*.js',
            'routes/*.js'
        ],
        outputFile: '/assets/scripts.js'
    });


    // compile the SASS
    var styles = compileSass(['app/styles'], 'main.scss', 'assets/styles.css');


    // extract extra static assets
    var extras = pickFiles('app', {
        srcDir: '/',
        files: ['index.html'],
        destDir: '/'
    });

    // merge all the trees together
    // var tree = mergeTrees([deps, scripts, 'app']);
    var tree = mergeTrees([deps, scripts, styles, extras]);
    return tree;

})();
