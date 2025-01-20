const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');

const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

let data = '';
readStream.on('data', (chunk) => {
  data += chunk;
});

readStream.on('end', () => {
  console.log(data);
});

readStream.on('error', (err) => {
  console.error('Ошибка чтения файла:', err);
});
