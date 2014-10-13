var when = require('when');
var fs = require('fs');
var spawn = require('child_process').spawn;
var out = fs.openSync('./phantomjs.log', 'w+');
var err = fs.openSync('./phantomjs.log', 'w+');

exports.path = require.resolve('phantomjs/bin/phantomjs');
if(process.platform === 'win32') {
  exports.path = require.resolve('phantomjs/lib/phantom/phantomjs.exe');
}

exports.version = '1.9.2';

var deferredAddress = when.defer();

exports.address = function() {
  return deferredAddress.promise;
};

exports.commandOptions = ['--webdriver=4444', '--ignore-ssl-errors=true'];

exports.start = function() {
  var deferred = when.defer();

  exports.child = spawn(exports.path,
                  exports.commandOptions,
                  { detached: true, stdio: [ 'ignore', out, err ] });
  exports.child.unref();

  // This should be replaced by a test, that waits til the server is up...
  setTimeout(function() {
    deferredAddress.resolve('http://127.0.0.1:4444/wd/hub');
    deferred.resolve();
  }, 2000);

  return deferred.promise;
};

exports.stop = function() {
  if(exports.child != null) {
    exports.child.kill();
  }
};
