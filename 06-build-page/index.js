const path = require('path');
const fs = require('fs');

const assets = path.join(__dirname, 'assets');
const styles = path.join(__dirname, 'styles');
const oldFiles = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
const copyFiles = path.join(__dirname, 'project-dist');
const copyAssets = path.join(__dirname, 'project-dist/assets');
const regex = /\{\{\s*(\w+)\s*\}\}/g;
const arr = [];

fs.mkdir(copyFiles, { recursive: true }, (err) => {
  if (err) {
    console.log('Error Found:', err);
  } else {
    readTemplate();
  }
});

async function readTemplate() {
  try {
    const data = await fs.promises.readFile(oldFiles);
    let templateContent = data.toString();
    let match;
    while ((match = regex.exec(templateContent)) !== null) {
      const addFile = path.join(components, match[1] + '.html');
      templateContent = templateContent.replace(
        match[0],
        (await fs.promises.readFile(addFile)).toString(),
      );
    }
    fs.promises.writeFile(path.join(copyFiles, 'index.html'), templateContent);
    concatCssFiles();
    getCopyFiles();
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
  }
}

async function concatCssFiles() {
  try {
    const files = await fs.promises.readdir(styles, {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const innerFile = await fs.promises.readFile(
          path.join(styles, file.name),
          'utf8',
        );
        arr.push(innerFile);
      }
    }
    fs.promises.writeFile(path.join(copyFiles, 'style.css'), arr.join('\n'));
  } catch (err) {
    console.error(err);
  }
}

async function getCopyFiles(address = assets, directoryName = '') {
  try {
    const files = await fs.promises.readdir(address, { withFileTypes: true });
    for (const file of files) {
      const sourcePath = path.join(address, file.name);
      const destPath = path.join(copyAssets, directoryName, file.name);
      if (file.isFile()) {
        await fs.promises.mkdir(path.dirname(destPath), { recursive: true });
        await fs.promises.copyFile(sourcePath, destPath);
      } else {
        await getCopyFiles(sourcePath, path.join(directoryName, file.name));
      }
    }
  } catch (err) {
    console.error(err);
  }
}
