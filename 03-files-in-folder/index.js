const path = require('path');
const { readdir, stat } = require('fs/promises');

(async (dirPath) => {
  const dirents = await readdir(dirPath, { withFileTypes: true });

  dirents.forEach(async (dirent) => {
    if (dirent.isDirectory()) return;

    const filePath = path.join(dirPath, dirent.name);

    const { name, ext } = path.parse(dirent.name);
    const size = (await stat(filePath)).size / 1024;

    process.stdout.write(`${name} - ${ext.slice(1) || 'none'} - ${size}kB\n`);
  });
})(path.join(__dirname, 'secret-folder'));
