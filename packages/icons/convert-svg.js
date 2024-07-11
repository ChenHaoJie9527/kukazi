const fs = require('fs');
const path = require('path');
const { transform } = require('@svgr/core');

const iconsDir = path.resolve(__dirname, 'src');
const outputDir = path.resolve(__dirname, 'dist');

fs.readdirSync(iconsDir).forEach(file => {
  const svg = fs.readFileSync(path.join(iconsDir, file), 'utf8');
  const componentName = file.replace('.svg', '');
  const jsx = transform.sync(svg, { icon: true, typescript: true }, { componentName });
  fs.writeFileSync(path.join(outputDir, `${componentName}.tsx`), jsx);
});
