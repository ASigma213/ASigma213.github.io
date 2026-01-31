const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'out');
const dest = path.join(__dirname, '..', 'htdocs');

if (!fs.existsSync(src)) {
  console.error('No "out" folder found. Run "npm run build" first.');
  process.exit(1);
}

function copyRecursiveSync(srcDir, destDir) {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  const entries = fs.readdirSync(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Clear htdocs first so old files don't linger
if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}
copyRecursiveSync(src, dest);
console.log('Copied build output to htdocs/');
console.log('Upload the contents of the htdocs folder to your web server.');
