const path = require('path');
const fs = require('fs');
const oldFiles = path.join(__dirname, 'styles');
const copyFiles = path.join(__dirname, 'project-dist/bundle.css');
const arr = [];

(async () => {
  try {
    const files = await fs.promises.readdir(oldFiles, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const innerFile = await fs.promises.readFile(
          path.join(oldFiles, file.name),
          'utf8',
        );
        arr.push(innerFile);
      }
    }
    fs.promises.writeFile(copyFiles, arr.join('\n'));
  } catch (err) {
    console.error(err);
  }
})();
