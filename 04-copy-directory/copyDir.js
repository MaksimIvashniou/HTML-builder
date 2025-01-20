const path = require('path');
const { readdir, rm, mkdir, copyFile } = require('fs/promises');

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

module.exports = copyDir;
