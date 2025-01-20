const path = require('path');
const { createWriteStream } = require('fs');
const { stdin, stdout, exit } = require('process');
const { createInterface } = require('readline/promises');

const message = {
  prompt: 'Enter some text: (Enter "exit" or press "ctrl + c" to end task)\n',
  exit: 'Goodbye!',
};

(function writeFile(filePath) {
  const writeStream = createWriteStream(filePath, { flags: 'a' });
  const rl = createInterface({ input: stdin, output: writeStream });

  stdout.write(message.prompt);

  rl.on('line', (line) => {
    if (line.trim() === 'exit') {
      exit();
    }

    writeStream.write(`${line}\n`);
  });

  process.on('SIGINT', () => {
    exit();
  });

  process.on('exit', () => {
    stdout.write(message.exit);
  });
})(path.join(__dirname, 'text.txt'));
