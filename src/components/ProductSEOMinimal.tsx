import { Helmet } from 'react-helmet-async';
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

const ProductSEOMinimal: React.FC<ProductSEOProps> = ({ product }) => {
  // Minimal structured data to reduce bundle size
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
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Undash-cop Private Limited",
      "url": "https://undash-cop.com"
    }
  }), [product.name, product.description, product.specifications?.platform]);

  return (
    <Helmet>
      {/* Essential Meta Tags Only */}
      <title>{product.name} - {product.category} Solution | Undash-cop</title>
      <meta name="description" content={product.description} />
      <meta name="keywords" content={`${product.name}, ${product.category}, software solution, business tools`} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />
      <meta property="og:title" content={`${product.name} - ${product.category} Solution | Undash-cop`} />
      <meta property="og:description" content={product.description} />
      <meta property="og:image" content={`https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />
      <meta property="twitter:title" content={`${product.name} - ${product.category} Solution | Undash-cop`} />
      <meta property="twitter:description" content={product.description} />
      <meta property="twitter:image" content={`https://undash-cop.com/logos/${product.name.toLowerCase().replace(/\s+/g, '-')}.png`} />

      {/* Canonical URL */}
      <link rel="canonical" href={`https://undash-cop.com/products/${product.name.toLowerCase().replace(/\s+/g, '-')}`} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ProductSEOMinimal;
