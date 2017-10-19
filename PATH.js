'use strict';

var path = require('path');

module.exports = function(compare) {
  var paths = process.env.PATH.split(path.delimiter);
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
