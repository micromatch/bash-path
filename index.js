'use strict';

const fs = require('fs');
const path = require('path');
let bashPath;

/**
 * Default paths to search
 */

const DEFAULT_PATHS = [
  '/bin/bash',
  '/sbin/bash',
  '/usr/bin/bash',
  '/usr/local/bin/bash',
  '/usr/local/sbin/bash',
  '/usr/sbin/bash',
  '/usr/X11/bin/bash',
  '/opt/local/bin',
  '/opt/local/sbin',
  'bash'
];

module.exports = paths => {
  if (bashPath !== void 0) return bashPath;

  const pathList = getPaths(paths || DEFAULT_PATHS);

  for (let i = 0; i < pathList.length; i++) {
    let filepath = path.resolve(pathList[i], 'bash');

    if (fs.existsSync(filepath)) {
      bashPath = filepath;
      break;
    }

    if (process.platform === 'win32') {
      if (fs.existsSync(filepath + '.cmd')) {
        bashPath = filepath + '.cmd';
        break;
      }

      if (fs.existsSync(filepath + '.exe')) {
        bashPath = filepath + '.exe';
        break;
      }

      if (fs.existsSync(filepath + '.bat')) {
        bashPath = filepath + '.bat';
        break;
      }
    }
  }

  // Set to null to avoid checking again later if path was not found
  if (!bashPath) {
    bashPath = null;
  }

  return bashPath;
};

function getPaths(paths) {
  const compare = val => /\/use?r\//i.test(val) ? -1 : 1;
  const list = paths.concat(process.env.PATH.split(path.delimiter));
  const unique = [...new Set(list)];
  unique.sort(compare);
  return unique;
}
