import { Title, Meta, Link, OpenGraph, TwitterCard, Schema } from 'react-meta-seo';
import { useMemo } from 'react';

interface ProductSEOProps {
  product: {
    name: string;
    description: string;
    category: string;
    features: string[];
    benefits: string[];
    pricing: string;
    specifications?: {
      platform: string;
      deployment: string;
      users: string;
      support: string;
      security: string;
      integration: string;
    };
  };
}

const ProductSEO: React.FC<ProductSEOProps> = ({ product }) => {
  const productUrl = `https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`;
  const productImage = `https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`;
  const pageTitle = `${product.name} - ${product.category} Solution | Undash-cop`;

  const structuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product.name,
    "description": product.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": product.specifications?.platform || "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": product.features,
    "screenshot": productImage,
    "provider": {
      "@type": "Organization",
      "name": "Undash-cop Private Limited",
      "url": "https://undash-cop.com",
      "logo": "https://undash-cop.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-0123",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Tech Street",
        "addressLocality": "San Francisco",
        "addressRegion": "CA",
        "postalCode": "94105",
        "addressCountry": "US"
      }
    },
    "author": {
      "@type": "Organization",
      "name": "Undash-cop Private Limited"
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "inLanguage": "en-US",
    "isAccessibleForFree": false,
    "keywords": [
      product.name,
      product.category,
      "software solution",
      "business tools",
      ...product.features.slice(0, 5)
    ].join(", "),
    "url": productUrl,
    "sameAs": [
      "https://www.linkedin.com/company/undash-cop",
      "https://twitter.com/undashcop",
      "https://www.facebook.com/undashcop"
    ]
  }), [product.name, product.description, product.features, product.specifications?.platform]);

  const breadcrumbStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://undash-cop.com" },
      { "@type": "ListItem", "position": 2, "name": "Products", "item": "https://undash-cop.com/products" },
      { "@type": "ListItem", "position": 3, "name": product.name, "item": productUrl }
    ]
  }), [product.name, productUrl]);

  const faqStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": `What is ${product.name}?`, "acceptedAnswer": { "@type": "Answer", "text": product.description } },
      { "@type": "Question", "name": `What are the key features of ${product.name}?`, "acceptedAnswer": { "@type": "Answer", "text": product.features.join(", ") } },
      { "@type": "Question", "name": `What are the benefits of using ${product.name}?`, "acceptedAnswer": { "@type": "Answer", "text": product.benefits.join(", ") } }
    ]
  }), [product.name, product.description, product.features, product.benefits]);

  const organizationStructuredData = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Undash-cop Private Limited",
    "url": "https://undash-cop.com",
    "logo": "https://undash-cop.com/logo.png",
    "description": "Leading provider of technology solutions, automation services, and digital transformation",
    "foundingDate": "2020",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/undash-cop",
      "https://twitter.com/undashcop",
      "https://www.facebook.com/undashcop"
    ]
  }), []);

  return (
    <>
      <Title>{pageTitle}</Title>

      <Meta name="description" content={product.description} />
      <Meta name="keywords" content={`${product.name}, ${product.category}, software solution, business tools, ${product.features.join(', ')}`} />
      <Meta name="author" content="Undash-cop Private Limited" />
      <Meta name="robots" content="index, follow" />
      <Meta name="language" content="English" />
      <Meta name="revisit-after" content="7 days" />
      <Meta name="theme-color" content="#3b82f6" />
      <Meta name="msapplication-TileColor" content="#3b82f6" />
      <Meta name="apple-mobile-web-app-capable" content="yes" />
      <Meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <Meta name="apple-mobile-web-app-title" content={product.name} />

      <Link rel="canonical" href={productUrl} />
      <Link rel="alternate" hrefLang="en" href={productUrl} />
      <Link rel="alternate" hrefLang="x-default" href={productUrl} />
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <Link rel="preconnect" href="https://www.google-analytics.com" />

      <OpenGraph
        title={pageTitle}
        description={product.description}
        type="website"
        url={productUrl}
        image={productImage}
        siteName="Undash-cop"
        locale="en_US"
      />

      <TwitterCard
        card="summary_large_image"
        title={pageTitle}
        description={product.description}
        image={productImage}
      />

      <Schema data={structuredData as never} />
      <Schema data={breadcrumbStructuredData as never} />
      <Schema data={faqStructuredData as never} />
      <Schema data={organizationStructuredData as never} />
    </>
  );
};

export default ProductSEO;
