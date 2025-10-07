import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductSEO from '../components/ProductSEOMinimal';
import companyData from '../data/companyData.js';

// Lazy load heavy components
const ProductContent = lazy(() => import('../components/ProductContent'));

// Import only essential icons
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  description: string;
  logo: string;
  features: string[];
  benefits: string[];
  pricing: string;
  category: string;
  link: string;
  longDescription?: string;
  specifications?: {
    platform: string;
    deployment: string;
    users: string;
    support: string;
    security: string;
    integration: string;
  };
  screenshots?: string[];
  testimonials?: Array<{
    name: string;
    company: string;
    role: string;
    content: string;
    rating: number;
  }>;
  faq?: Array<{
    question: string;
    answer: string;
  }>;
}

const ProductDetailMinimal = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Simplified product data processing
  const enhancedProduct = useMemo(() => {
    const foundProduct = companyData.products.find((p: { name: string }) => 
      p.name.toLowerCase().replace(/\s+/g, '-') === productId
    );

    if (!foundProduct) return null;

    return {
      id: foundProduct.name.toLowerCase().replace(/\s+/g, '-'),
      name: foundProduct.name,
      description: foundProduct.description,
      logo: foundProduct.photo,
      features: foundProduct.features || [],
      benefits: foundProduct.benefits || [],
      pricing: 'Contact for pricing',
      category: getProductCategory(foundProduct.name),
      link: foundProduct.link,
      longDescription: getLongDescription(foundProduct.name),
      specifications: getSpecifications(foundProduct.name),
      screenshots: getScreenshots(),
      testimonials: getTestimonials(foundProduct.name),
      faq: getFAQ(foundProduct.name)
    } as Product;
  }, [productId]);

  useEffect(() => {
    setProduct(enhancedProduct);
    setLoading(false);
  }, [enhancedProduct]);

  // Simplified helper functions
  function getProductCategory(productName: string): string {
    const categoryMap: { [key: string]: string } = {
      'EUP Dashboard': 'HR & Finance',
      'Undash-cop Studio': 'Web Development',
      'Serviso': 'Business Tools',
      'Futuro Expenses': 'Personal Finance',
      'YRB Services': 'IT Services',
      'Fotralife': 'Travel & Community'
    };
    return categoryMap[productName] || 'Software Solutions';
  }

  function getLongDescription(productName: string): string {
    const descriptions: { [key: string]: string } = {
      'EUP Dashboard': `EUP Dashboard represents the pinnacle of integrated business management solutions, specifically engineered for modern enterprises seeking comprehensive control over their human resources and financial operations.`,
      'Undash-cop Studio': `Undash-cop Studio is a cutting-edge web development platform that empowers businesses to create stunning, high-performance websites and web applications with unprecedented ease and efficiency.`,
      'Serviso': `Serviso is a revolutionary business management platform designed to streamline operations and enhance productivity across all departments.`,
      'Futuro Expenses': `Futuro Expenses is a sophisticated personal finance management application that brings clarity and control to your financial life.`,
      'YRB Services': `YRB Services represents the future of IT service management, providing comprehensive solutions that keep your technology infrastructure running smoothly and efficiently.`,
      'Fotralife': `Fotralife is a vibrant travel and community platform that connects travelers with authentic local experiences and like-minded adventurers.`
    };
    return descriptions[productName] || productName;
  }

  function getSpecifications(productName: string) {
    const specs: { [key: string]: {
      platform: string;
      deployment: string;
      users: string;
      support: string;
      security: string;
      integration: string;
    } } = {
      'EUP Dashboard': {
        platform: 'Web-based, Mobile Responsive',
        deployment: 'Cloud, On-premise, Hybrid',
        users: 'Unlimited users with role-based access',
        support: '24/7 technical support, Training included',
        security: 'Enterprise-grade encryption, SOC 2 compliant',
        integration: 'REST APIs, Webhooks, SSO, 100+ integrations'
      },
      'Undash-cop Studio': {
        platform: 'Cross-platform (Web, Mobile, Desktop)',
        deployment: 'Cloud hosting, CDN distribution',
        users: 'Unlimited concurrent users',
        support: 'Dedicated project manager, Ongoing maintenance',
        security: 'SSL encryption, Regular security updates',
        integration: 'Third-party APIs, Analytics, Payment gateways'
      },
      'Serviso': {
        platform: 'Web-based, Mobile app available',
        deployment: 'SaaS, Private cloud options',
        users: 'Scalable from 10 to 10,000+ users',
        support: 'Business hours support, Priority support available',
        security: 'Data encryption, Regular backups, Access controls',
        integration: 'ERP systems, CRM platforms, Accounting software'
      },
      'Futuro Expenses': {
        platform: 'iOS, Android, Web application',
        deployment: 'Cloud-based with offline sync',
        users: 'Personal and family accounts',
        support: 'Email support, In-app help center',
        security: 'Bank-level encryption, Biometric authentication',
        integration: 'Bank accounts, Credit cards, Investment platforms'
      },
      'YRB Services': {
        platform: 'Multi-platform support',
        deployment: 'On-site, Remote, Hybrid support',
        users: 'Enterprise-level support',
        support: '24/7 monitoring, Emergency response',
        security: 'Advanced threat protection, Compliance management',
        integration: 'Existing IT infrastructure, Third-party tools'
      },
      'Fotralife': {
        platform: 'iOS, Android, Web platform',
        deployment: 'Cloud-based with global CDN',
        users: 'Community-driven platform',
        support: 'Community support, Premium support available',
        security: 'User data protection, Secure payments',
        integration: 'Social media, Travel booking platforms, Maps'
      }
    };
    return specs[productName] || {
      platform: 'Web-based',
      deployment: 'Cloud',
      users: 'Unlimited',
      support: 'Email support',
      security: 'Standard encryption',
      integration: 'REST APIs'
    };
  }

  function getScreenshots(): string[] {
    return [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format'
    ];
  }

  function getTestimonials(productName: string) {
    const testimonials: { [key: string]: Array<{
      name: string;
      company: string;
      role: string;
      content: string;
      rating: number;
    }> } = {
      'EUP Dashboard': [
        {
          name: 'Sarah Johnson',
          company: 'TechCorp Solutions',
          role: 'HR Director',
          content: 'EUP Dashboard has revolutionized our HR operations. The automation features have saved us countless hours.',
          rating: 5
        }
      ],
      'Undash-cop Studio': [
        {
          name: 'Emily Rodriguez',
          company: 'Creative Agency',
          role: 'Creative Director',
          content: 'The quality of work from Undash-cop Studio is exceptional. They understood our vision and delivered beyond our expectations.',
          rating: 5
        }
      ]
    };
    return testimonials[productName] || [];
  }

  function getFAQ(productName: string) {
    const faqs: { [key: string]: Array<{
      question: string;
      answer: string;
    }> } = {
      'EUP Dashboard': [
        {
          question: 'How quickly can we get started with EUP Dashboard?',
          answer: 'Most organizations can be up and running within 2-4 weeks, depending on data migration complexity.'
        }
      ],
      'Undash-cop Studio': [
        {
          question: 'What technologies do you use for web development?',
          answer: 'We use modern technologies including React, Next.js, Node.js, TypeScript, and various other cutting-edge frameworks.'
        }
      ]
    };
    return faqs[productName] || [];
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProductSEO product={product} />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Simplified */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mr-6 shadow-lg">
                  <img 
                    src={product.logo} 
                    alt={`${product.name} logo`}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <span className="inline-block px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-full">
                    {product.category}
                  </span>
                </div>
              </div>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={product.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
                >
                  Try Now
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </a>
                <div className="flex-1 text-center py-4 px-8 border border-primary-600 rounded-lg">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.pricing}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Key Features</h3>
                <div className="space-y-4">
                  {product.features.slice(0, 6).map((feature: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 mt-2"></div>
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy-loaded Product Content */}
      <Suspense fallback={
        <div className="py-16 bg-white">
          <div className="container-custom">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </div>
      }>
        <ProductContent 
          product={product} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
      </Suspense>

      {/* CTA Section - Simplified */}
      <section className="py-16 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started with {product.name}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have transformed their business with our solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Try {product.name} Now
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <Link
              to="/contact"
              className="border border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailMinimal;
