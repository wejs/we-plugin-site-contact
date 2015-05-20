var projectPath = process.cwd();
var fs = require('fs-extra');
var path = require('path');
var async = require('async');
var testTools = require('we-test-tools');
var we;

before(function(callback) {
  this.slow(100);

  testTools.copyLocalConfigIfNotExitst(projectPath, function() {
    we = require('we-core');

    testTools.init({}, we);

    we.bootstrap({
      i18n: {
        directory: path.join(__dirname, 'locales'),
        updateFiles: true
      }
    } , function(err, we) {
      if (err) return console.error(err);

      we.startServer(function(err) {
        if (err) return console.error(err);
        callback();
      })
    })

  })
})

//after all tests
after(function (callback) {
  we.db.defaultConnection.close();
  callback();
});
