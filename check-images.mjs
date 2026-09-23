import fs from 'fs';
import path from 'path';
import https from 'https';

function findFiles(dir, filter, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.next')) {
        findFiles(filePath, filter, fileList);
      }
    } else if (filter.test(filePath)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const files = findFiles('./', /\.(tsx|ts|json)$/);
const urls = new Set();

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.match(/https:\/\/images\.unsplash\.com\/[^\s"',]+/g);
  if (matches) {
    matches.forEach(m => urls.add(m));
  }
}

console.log(`Testing ${urls.size} distinct Unsplash URLs...`);

const testUrl = (url) => new Promise((resolve) => {
  https.get(url, (res) => {
    if (res.statusCode === 404) {
      console.log(`[404] ${url}`);
    }
    resolve();
  }).on('error', () => {
    console.log(`[ERROR] ${url}`);
    resolve();
  });
});

(async () => {
  const promises = Array.from(urls).map(url => testUrl(url));
  await Promise.all(promises);
  console.log('Done checking URLs.');
})();
