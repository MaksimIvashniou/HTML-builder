const path = require('path');
const { createReadStream } = require('fs');

(function readFile(filePath) {
  const readStream = createReadStream(filePath);

  readStream.on('data', (chunk) => {
    process.stdout.write(chunk);
  });
})(path.join(__dirname, 'text.txt'));
