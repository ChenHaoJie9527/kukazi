const fs = require("../utils/fs");
const path = require("../utils/path");

async function generateIndex(directory) {
  const files = await fs.readdir(directory);
  let indexContent = "";

  for (const file of files) {
    if (path.extname(file) === ".svg") {
      const baseName = path.basename(file, ".svg");
      indexContent += `export { default as ${baseName}Icon } from './${file}';\n`;
    }
  }

  await fs.writeFile(path.join(directory, "index.ts"), indexContent);
}

module.exports = {
  generateIndex,
};
