const path = require('path');
const mergeStyles = require('./mergeStyles');

mergeStyles(
  path.join(__dirname, 'styles'),
  path.join(__dirname, 'project-dist', 'bundle.css'),
);
