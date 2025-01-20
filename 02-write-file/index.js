const path = require('path');
const fs = require('fs');

const filePath = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(filePath);
const { stdin, stdout } = process;

stdout.write('Hello!\n');
stdin.on('data', (chunk) => {
  if (chunk.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(chunk);
});

process.on('SIGINT', () => process.exit());

process.on('exit', () => stdout.write('Goodbye!'));
