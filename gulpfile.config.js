'use strict';

var GulpConfig = (function () {
  function GulpConfig() {
    this.source = './src/';
    this.sourceApp = this.source + 'app/';
    this.sourceAppCoffee = this.sourceApp + '*.coffee';
    this.sourceAppJs = this.sourceApp + '*.js';

    this.modules = './node_modules/';
    this.moduleLibs = [
      this.modules + 'jquery/dist/jquery.js',
      this.modules + 'bootstrap/dist/js/bootstrap.js',
      this.modules + 'angular/angular.js'
    ];
    this.moduleStyles = [
      this.modules + 'bootstrap/dist/css/bootstrap.css'
    ];

    this.bootstrapFonts = this.modules + 'bootstrap/dist/fonts/*';

    this.output = './public/';
    this.outputJs = this.output + 'js/';
    this.outputCss = this.output + 'css/';
    this.outputFonts = this.output + 'fonts/';
    
    this.allLibs = 'lib.js';
    this.allStyles = 'lib.css';
    this.allApp = 'app.js';
  }
  
  return GulpConfig;
})();

module.exports = GulpConfig;
