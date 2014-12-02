// Brocfile.js

var concat = require('broccoli-concat');
var compileSass = require('broccoli-sass');
var mergeTrees = require('broccoli-merge-trees');

// concat the JS
var scripts = concat('app/', {
    inputFiles: ['**/*.js'],
    outputFile: '/assets/scripts.js'
});

// compile the SASS
var styles = compileSass(['app/styles'], 'app.scss', 'assets/styles.css');

// merge all the trees together
module.exports = mergeTrees([scripts, styles, 'app/'])
