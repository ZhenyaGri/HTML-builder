const path = require('path');
const fs = require('fs').promises;

const filePath = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await fs.readdir(filePath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const stats = await fs.stat(path.join(filePath, file.name));
        const extension = path.extname(file.name);
        const nameWithoutExtension = path.basename(file.name, extension);
        const extensionWithoutDot = extension.substring(1);
        console.log(
          `${nameWithoutExtension} - ${extensionWithoutDot} - ${stats.size}b`,
        );
      }
    }
  } catch (err) {
    console.error(err);
  }
})();
