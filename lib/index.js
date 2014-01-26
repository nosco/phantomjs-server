var when = require('when');

exports.path = './node_modules/phantomjs/bin/phantomjs' + (process.platform === 'win32' ? 'exe' : '');
exports.version = '1.9.2';

var deferredAddress = when.defer();

exports.address = function() {
  return deferredAddress.promise;
}

exports.start = function() {
  var deferred = when.defer();

  exports.defaultInstance = require('child_process').spawn(exports.path, ['--webdriver=4444']);//, function (error, stdout, stderr) {
  exports.defaultInstance.stdout.on('data', function (data) {
    setTimeout(function() {
      deferredAddress.resolve('http://127.0.0.1:4444/wd/hub');
    }, 250);
  });
  exports.defaultInstance.stderr.on('data', function (data) {
    deferredAddress.reject();
  });
  exports.defaultInstance.on('close', function (code) {
    if(code > 0) {
      deferredAddress.reject();
    }
  });

  return exports.defaultInstance;
};

exports.stop = function() {
  if(exports.defaultInstance != null) {
    exports.defaultInstance.kill();
  }
};
