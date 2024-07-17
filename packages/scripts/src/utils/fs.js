const fs = require('fs').promises;

module.exports = {
  readFile: fs.readFile,
  writeFile: fs.writeFile,
  readdir: fs.readdir
};