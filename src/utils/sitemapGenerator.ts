import companyData from '../data/companyData.js';

export interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

export const generateSitemap = (): SitemapUrl[] => {
  const baseUrl = 'https://undash-cop.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticPages: SitemapUrl[] = [
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
  const productPages: SitemapUrl[] = companyData.products.map((product: any) => ({
    loc: `${baseUrl}/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: 0.8
  }));

  // Generate blog post pages (if you have blog data)
  const blogPages: SitemapUrl[] = companyData.blogs?.map((blog: any) => ({
    loc: `${baseUrl}/blog/${blog.id}`,
    lastmod: blog.date || currentDate,
    changefreq: 'monthly',
    priority: 0.6
  })) || [];

  // Generate case study pages (if you have case study data)
  const caseStudyPages: SitemapUrl[] = [
    // Add case study pages here if you have case study data
  ];

  return [...staticPages, ...productPages, ...blogPages, ...caseStudyPages];
};

export const generateSitemapXML = (): string => {
  const urls = generateSitemap();
  
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
  
  return `${xmlHeader}
${urlsetOpen}${urlEntries}
${urlsetClose}`;
};

export default generateSitemap;
