import { Title, Meta, Link, OpenGraph, TwitterCard, Schema } from 'react-meta-seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: Record<string, unknown>;
  noIndex?: boolean;
}

const SEOHead = ({
  title = "Undash-cop - Technology Solutions & Automation Services",
  description = "Software, cloud, and automation for startups and growing businesses. Proven delivery. Engineering-first. AI built into our products for reliability and outcomes.",
  keywords = "software, cloud, automation, AI, startups, founders, engineering, SaaS, production AI",
  canonicalUrl,
  ogImage = "/logos/undash-cop-studio.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noIndex = false
}: SEOHeadProps) => {
  const fullTitle = title.includes("Undash-cop") ? title : `${title} | Undash-cop`;
  const currentUrl = canonicalUrl || (typeof window !== 'undefined' ? window.location.href : 'https://undash-cop.com');
  const absoluteOgImage = ogImage.startsWith('http') ? ogImage : `https://undash-cop.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return (
    <>
      <Title>{fullTitle}</Title>

      <Meta name="description" content={description} />
      <Meta name="keywords" content={keywords} />
      <Meta name="author" content="Undash-cop" />
      <Meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <Meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      {noIndex && <Meta name="robots" content="noindex, nofollow" />}

      <Link rel="canonical" href={currentUrl} />

      <OpenGraph
        title={fullTitle}
        description={description}
        type={ogType}
        url={currentUrl}
        image={absoluteOgImage}
        siteName="Undash-cop"
        locale="en_US"
      />

      <TwitterCard
        card={twitterCard}
        title={fullTitle}
        description={description}
        image={absoluteOgImage}
      />

      {structuredData && <Schema data={structuredData as never} />}
    </>
  );
};

export default SEOHead;
