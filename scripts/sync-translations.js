const fs = require('fs');

const pathRoot = 'public/translations';

const souceFileName = 'en';
const list = getFileContent(`${pathRoot}/list.json`);
const targetFileNames = list.map(m => m.code).filter(f => f !== souceFileName);

function getFileContent(path, parse = true) {
  const content = fs.readFileSync(path, {
    encoding: 'utf-8',
  });
  return parse ? JSON.parse(content) : content;
}

function nullify(obj) {
  if (typeof obj === 'string') {
    return null;
  }

  if (obj) {
    for (const key of Object.keys(obj)) {
      obj[key] = nullify(obj[key]);
    }
  }
  return obj;
}

function sync(src, dest) {
  if (typeof dest !== 'string') {
    for (const key of Object.keys(src)) {
      if (key in dest) {
        sync(src[key], dest[key]);
      } else {
        dest[key] = nullify(src[key]);
      }
    }
  }
  return dest;
}

const sourceContent = getFileContent(
  `${pathRoot}/${souceFileName}.json`,
  false
);

targetFileNames.forEach(destName => {
  const pathDest = `${pathRoot}/${destName}.json`;
  let targetContent = getFileContent(pathDest);
  targetContent = sync(JSON.parse(sourceContent), targetContent);
  fs.writeFileSync(pathDest, JSON.stringify(targetContent, null, 2));
});
