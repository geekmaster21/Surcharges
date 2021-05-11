const fs = require('fs');
const nodeFetch = require('node-fetch');

async function generateSiteMap() {
  console.log('SITEMAP: call api fetch');
  const apiResp = await nodeFetch(
    'https://api.orangefox.download/v3/devices/?supported=true',
    {
      method: 'GET',
    }
  );
  const resp = await apiResp.json();
  console.log('SITEMAP: got response');
  const deviceList = resp.data
    .map(
      d => `
<url>
    <loc>https://orangefox.download/device/${d.codename}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.00</priority>
</url>
    `
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://wwwsitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    ${deviceList}
</urlset>
      `;
  console.log('SITEMAP: generated');
  fs.writeFileSync('public/sitemap.xml', sitemap);
  console.log('SITEMAP: end');
}

try {
  console.log('SITEMAP: start');
  generateSiteMap();
} catch (error) {
  console.error('Error occurred while creating sitemap', error);
}
