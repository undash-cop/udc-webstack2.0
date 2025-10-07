import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read company data
const companyDataPath = path.join(__dirname, 'src/data/companyData.js');
const companyDataContent = fs.readFileSync(companyDataPath, 'utf8');

// Extract products from the file (simple parsing)
const productsMatch = companyDataContent.match(/products:\s*\[([\s\S]*?)\]/);
if (!productsMatch) {
  console.error('Could not find products in companyData.js');
  process.exit(1);
}

// Simple product extraction (this is a basic approach)
const productNames = [
  'EUP Dashboard',
  'Undash-cop Studio', 
  'Serviso',
  'Futuro Expenses',
  'YRB Services',
  'Fotralife'
];

// Generate sitemap
const baseUrl = 'https://undash-cop.com';
const currentDate = new Date().toISOString().split('T')[0];

const staticPages = [
  {
    loc: `${baseUrl}/`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 1.0
  },
  {
    loc: `${baseUrl}/products`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: `${baseUrl}/about`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/contact`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${baseUrl}/blog`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: `${baseUrl}/case-studies`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: `${baseUrl}/careers`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.7
  },
  {
    loc: `${baseUrl}/support`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.6
  },
  {
    loc: `${baseUrl}/privacy-policy`,
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: 0.3
  },
  {
    loc: `${baseUrl}/terms-and-conditions`,
    lastmod: currentDate,
    changefreq: 'yearly',
    priority: 0.3
  }
];

// Generate product detail pages
const productPages = productNames.map((productName) => ({
  loc: `${baseUrl}/products/${productName.toLowerCase().replace(/\s+/g, '-')}`,
  lastmod: currentDate,
  changefreq: 'weekly',
  priority: 0.8
}));

const urls = [...staticPages, ...productPages];

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
const urlsetClose = '</urlset>';

const urlEntries = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('');

const sitemapXML = `${xmlHeader}
${urlsetOpen}${urlEntries}
${urlsetClose}`;

// Write to public directory
const publicDir = path.join(__dirname, 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write sitemap
fs.writeFileSync(sitemapPath, sitemapXML);

console.log('✅ Sitemap generated successfully!');
console.log(`📁 Location: ${sitemapPath}`);
console.log(`🌐 URL: https://undash-cop.com/sitemap.xml`);

// Also generate robots.txt
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://undash-cop.com/sitemap.xml

# Crawl-delay for bots
Crawl-delay: 1

# Disallow admin areas (if any)
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /products/
Allow: /blog/
Allow: /case-studies/
`;

const robotsPath = path.join(publicDir, 'robots.txt');
fs.writeFileSync(robotsPath, robotsTxt);

console.log('✅ Robots.txt generated successfully!');
console.log(`📁 Location: ${robotsPath}`);
console.log(`🌐 URL: https://undash-cop.com/robots.txt`);
