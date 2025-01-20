const path = require('path');

const sourcePath = {
  template: path.join(__dirname, 'template.html'),
  assets: path.join(__dirname, 'assets'),
  components: path.join(__dirname, 'components'),
  styles: path.join(__dirname, 'styles'),
};

const dist = path.join(__dirname, 'project-dist');

const bundle = {
  dist,
  html: path.join(dist, 'index.html'),
  assets: path.join(dist, 'assets'),
  styles: path.join(dist, 'style.css'),
};
