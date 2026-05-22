const fs = require('fs');
const path = require('path');

const tools = JSON.parse(fs.readFileSync(path.join(__dirname, 'search-index.json'), 'utf-8'));
const baseUrl = 'https://tools.yzn123.cc';
const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

const pages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about.html', priority: '0.5', changefreq: 'monthly' },
    { path: '/404.html', priority: '0.1', changefreq: 'yearly' }
];

tools.forEach(tool => {
    pages.push({ path: tool.path, priority: '0.8', changefreq: 'weekly' });
});

pages.forEach(page => {
    let toolPath = page.path.startsWith('/') ? page.path : '/' + page.path;
    xml += `  <url>
    <loc>${baseUrl}${toolPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
});

xml += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), xml, 'utf-8');
console.log(`Generated sitemap.xml with ${pages.length} URLs.`);
