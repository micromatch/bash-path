'use strict';

var path = require('path');

module.exports = function(compare) {
  var paths = process.env.PATH.split(path.delimiter);
  if (paths.indexOf('/usr/local/bin/bash') === -1) paths.push('/usr/local/bin/bash');
  if (paths.indexOf('/bin/bash') === -1) paths.push('/bin/bash');
  if (paths.indexOf('bash') === -1) paths.push('bash');
  if (typeof compare === 'function') {
    paths.sort(compare);
    return paths;
  }
  if (typeof compare === false) {
    return paths;
  }
  paths.sort(comparison);
  return paths;
};

function comparison(a, b) {
  return /use?r\//.test(a) ? -1 : 1;
}
