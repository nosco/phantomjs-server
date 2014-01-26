[![NPM version](https://badge.fury.io/js/phantom-server.png)](http://badge.fury.io/js/phantom-server)

PhantomServer
=======

Use PhantomJS as a drop-in replacement for your Selenium Standalone server.

-

This is just a simple script to start a PhantomJS webdriver instead of the Selenium standalone server.

The server.address() works the same way as the selenium-webdriver's version, by responded with a promise that will eventually resolve to the localhost address of PhantomJS.

PhantomJS is 1.9.2-6 as this is the last working version on Mac OS X.

### How it works

Assuming a Selenium testing script looking something like this:
```
var webdriver = require('selenium-webdriver');

var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var server = new SeleniumServer('bin/selenium-server-standalone.jar', { port: 4444 });
server.start();

var browser = { "browserName": "firefox" };

var driver = new webdriver.Builder().
  usingServer(server.address()).
  withCapabilities(browser).
  build();
```

You only need to replace this:
```
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;
var server = new SeleniumServer('bin/selenium-server-standalone.jar', { port: 4444 });
server.start();
```

With this:
```
var phantom = require('phantom-server');
phantom.start();
```



So the final script looks like:

```
var webdriver = require('selenium-webdriver');

var phantom = require('phantom-server');
phantom.start();

var browser = { "browserName": "phantomjs" };

var driver = new webdriver.Builder().
  usingServer(server.address()). // This part is important!
  withCapabilities(browser).
  build();
```

### Troubleshooting
If the PhantomJS server won't start, it is probably because you have these 2 files:

* /usr/local/lib/libssl.0.9.8.dylib
* /usr/local/lib/libssl.dylib

Move them to something like:

* /usr/local/lib/_libssl.0.9.8.dylib
* /usr/local/lib/_libssl.dylib

And you should be good to go!
