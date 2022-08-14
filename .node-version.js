(function() {
  'use strict';
  var message  = '';
  var exitCode = 0;
  var supportedNodeVersion = 'v14.12.0';

  if (process.version === supportedNodeVersion) {
    message = 'You are using the supported node version for this project. Continuing...';
  } else {
    message = 'You must use node ' + supportedNodeVersion + ' while developing this project. Exiting...';
    exitCode = 1;
  }

  console.log(message);
  process.exit(exitCode);
})();
