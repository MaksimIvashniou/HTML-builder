const path = require('path');
const copyDir = require('./copyDir');

copyDir(path.join(__dirname, 'files'), path.join(__dirname, 'files-copy'));
