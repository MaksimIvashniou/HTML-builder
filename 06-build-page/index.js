const path = require('path');
const { readFile, writeFile, rm, mkdir, readdir } = require('fs/promises');

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

async function buildDist(targetPath) {
  await rm(targetPath, { recursive: true, force: true });
  await mkdir(targetPath, { recursive: true });
}

async function buildHtml(sourcePath, targetPath) {
  const extension = '.html';
  const dirents = await readdir(sourcePath.components, { withFileTypes: true });

  let htmlContent = await readFile(sourcePath.template, 'utf-8');

  for (const dirent of dirents) {
    if (dirent.isFile() && path.extname(dirent.name) === extension) {
      const componentPath = path.join(dirent.path, dirent.name);
      const componentName = path.basename(dirent.name, extension);

      htmlContent = htmlContent.replaceAll(
        `{{${componentName}}}`,
        await readFile(componentPath, 'utf-8'),
      );
    }
  }

  await writeFile(targetPath, htmlContent, { flag: 'w' });
}
