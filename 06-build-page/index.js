const path = require('path');
const {
  readFile,
  writeFile,
  rm,
  mkdir,
  readdir,
  copyFile,
} = require('fs/promises');

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

async function copyDir(sourceDir, targetDir) {
  const dirents = await readdir(sourceDir, { withFileTypes: true });

  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });

  for (const dirent of dirents) {
    const [source, target] = [
      path.join(sourceDir, dirent.name),
      path.join(targetDir, dirent.name),
    ];

    dirent.isDirectory()
      ? await copyDir(source, target)
      : await copyFile(source, target);
  }
}

async function mergeStyles(sourcePath, targetPath) {
  const extension = '.css';
  const styles = [];

  const dirents = await readdir(sourcePath, { withFileTypes: true });

  for (const dirent of dirents) {
    if (dirent.isFile() && path.extname(dirent.name) === extension) {
      const stylePath = path.join(dirent.path, dirent.name);

      styles.push(`/* ${dirent.name} */`, await readFile(stylePath, 'utf-8'));
    }
  }

  await writeFile(targetPath, styles.join('\n'), { flag: 'w' });
}

async function buildPage(sourcePath, targetPath) {
  await buildDist(targetPath.dist);

  await buildHtml(
    {
      template: sourcePath.template,
      components: sourcePath.components,
    },
    targetPath.html,
  );

  await copyDir(sourcePath.assets, targetPath.assets);

  await mergeStyles(sourcePath.styles, targetPath.styles);
}

buildPage(sourcePath, bundle);
