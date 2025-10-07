import { Helmet } from 'react-helmet-async';

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
  const structuredData = {
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
    "screenshot": `https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`,
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
    "url": `https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`,
    "sameAs": [
      "https://www.linkedin.com/company/undash-cop",
      "https://twitter.com/undashcop",
      "https://www.facebook.com/undashcop"
    ]
  };

  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://undash-cop.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://undash-cop.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`
      }
    ]
  };

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What is ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": product.description
        }
      },
      {
        "@type": "Question",
        "name": `What are the key features of ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": product.features.join(", ")
        }
      },
      {
        "@type": "Question",
        "name": `What are the benefits of using ${product.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": product.benefits.join(", ")
        }
      }
    ]
  };

  const organizationStructuredData = {
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
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{product.name} - {product.category} Solution | Undash-cop</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={`${product.name}, ${product.category}, software solution, business tools, ${product.features.join(', ')}`} />
      <meta name="author" content="Undash-cop Private Limited" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />
      <meta property="og:title" content={`${product.name} - ${product.category} Solution | Undash-cop`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={`https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Undash-cop" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />
      <meta property="twitter:title" content={`${product.name} - ${product.category} Solution | Undash-cop`} />
      <meta property="twitter:description" content={product.description} />
      <meta property="twitter:image" content={`https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={product.name} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />

      {/* Alternate Language Versions (if applicable) */}
      <link rel="alternate" hrefLang="en" href={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />
      <link rel="alternate" hrefLang="x-default" href={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />

      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(faqStructuredData)}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>
    </Helmet>
  );
};

export default ProductSEO;
