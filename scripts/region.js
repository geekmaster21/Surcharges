// https://github.com/mattcg/language-subtag-registry/tree/master/data/json
// https://github.com/thekelvinliu/country-code-emoji/blob/main/src/index.js

const fs = require('fs');
const nodeFetch = require('node-fetch');

const source_registry = () =>
  nodeFetch(
    'https://raw.githubusercontent.com/mattcg/language-subtag-registry/master/data/json/registry.json',
    {
      method: 'GET',
    }
  );

async function regions() {
  const data = await (await source_registry()).json();
  return data
    .filter(f => f.Type === 'region' && f.Subtag.length === 2)
    .map(m => ({
      isoCode: m.Subtag,
      region: m.Description.pop(),
    }));
}

const OFFSET = 127397;
const CC_REGEX = /^[a-z]{2}$/i;

function countryCodeEmoji(cc) {
  if (!CC_REGEX.test(cc)) {
    const type = typeof cc;
    throw new TypeError(
      `cc argument must be an ISO 3166-1 alpha-2 string, but got '${
        type === 'string' ? cc : type
      }' instead.`
    );
  }

  const codePoints = [...cc.toUpperCase()].map(c => c.codePointAt() + OFFSET);
  return String.fromCodePoint(...codePoints);
}

(async () => {
  let res = await regions();
  res = res.map(m => ({
    ...m,
    flag: countryCodeEmoji(m.isoCode),
  }));
  res.push({
    isoCode: 'DL',
    region: 'Global',
    flag: '🌎',
  });
  fs.writeFileSync('public/region.json', JSON.stringify(res, null, 2));
})();
