const path = require('path');
const { readdir, readFile, writeFile } = require('fs/promises');

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

module.exports = mergeStyles;
