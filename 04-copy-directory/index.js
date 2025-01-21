const path = require('path');
const fs = require('fs');
const oldFiles = path.join(__dirname, 'files');
const copyFiles = path.join(__dirname, 'files-copy');

fs.mkdir(copyFiles, { recursive: true }, (err) => {
  if (err) {
    console.log('Error Found:', err);
  } else {
    getCopyFiles();
  }
});

async function getCopyFiles() {
  try {
    const files = await fs.promises.readdir(oldFiles, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        fs.promises.copyFile(
          path.join(oldFiles, file.name),
          path.join(copyFiles, file.name),
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
}
