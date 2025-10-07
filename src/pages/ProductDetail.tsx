import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ProductSEO from '../components/ProductSEO';
import companyData from '../data/companyData.js';
import { 
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CogIcon,
  CloudIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

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

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Find product by ID
    const foundProduct = companyData.products.find((p: any) => 
      p.name.toLowerCase().replace(/\s+/g, '-') === productId
    );

    if (foundProduct) {
      const enhancedProduct: Product = {
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
      };
      setProduct(enhancedProduct);
    }
    setLoading(false);
  }, [productId]);

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
      'EUP Dashboard': `EUP Dashboard represents the pinnacle of integrated business management solutions, specifically engineered for modern enterprises seeking comprehensive control over their human resources and financial operations. This powerful platform combines intuitive design with robust functionality, enabling organizations to streamline their workforce management, track employee performance, manage payroll systems, and maintain detailed financial records all from a single, unified interface. Built with scalability in mind, EUP Dashboard adapts to businesses of all sizes, from growing startups to established enterprises, providing the tools necessary to make informed decisions and drive organizational success.`,
      'Undash-cop Studio': `Undash-cop Studio is a cutting-edge web development platform that empowers businesses to create stunning, high-performance websites and web applications with unprecedented ease and efficiency. Our comprehensive suite of tools and services combines the latest technologies with innovative design principles to deliver digital solutions that not only meet but exceed modern web standards. From responsive design and mobile optimization to advanced functionality and seamless user experiences, Undash-cop Studio transforms your digital vision into reality.`,
      'Serviso': `Serviso is a revolutionary business management platform designed to streamline operations and enhance productivity across all departments. This comprehensive solution integrates seamlessly with your existing workflows, providing real-time insights, automated processes, and powerful analytics that drive informed decision-making. Whether you're managing customer relationships, tracking inventory, or coordinating team projects, Serviso delivers the tools and visibility you need to optimize your business operations and achieve sustainable growth.`,
      'Futuro Expenses': `Futuro Expenses is a sophisticated personal finance management application that brings clarity and control to your financial life. Designed with the modern user in mind, this intuitive platform helps you track spending, set budgets, monitor investments, and plan for the future with confidence. Advanced categorization, smart notifications, and comprehensive reporting features provide the insights you need to make informed financial decisions and achieve your monetary goals.`,
      'YRB Services': `YRB Services represents the future of IT service management, providing comprehensive solutions that keep your technology infrastructure running smoothly and efficiently. Our expert team delivers round-the-clock support, proactive monitoring, and strategic guidance to ensure your systems remain secure, optimized, and aligned with your business objectives. From network management and cybersecurity to cloud solutions and digital transformation, YRB Services is your trusted partner in navigating the complex world of enterprise technology.`,
      'Fotralife': `Fotralife is a vibrant travel and community platform that connects travelers with authentic local experiences and like-minded adventurers. This innovative platform combines social networking with travel planning, allowing users to discover hidden gems, share experiences, and build lasting connections with fellow travelers from around the world. With advanced matching algorithms, social features, and comprehensive destination guides, Fotralife makes it easy to discover new places, connect with fellow travelers, and create the perfect itinerary for your next adventure. The platform's mobile-first design ensures you have access to all features and community insights wherever your travels take you.`
    };
    return descriptions[productName] || productName;
  }

  function getSpecifications(productName: string) {
    const specs: { [key: string]: any } = {
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
    return specs[productName] || {};
  }

  function getScreenshots(): string[] {
    // Placeholder screenshots - in real implementation, these would be actual product screenshots
    return [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop&auto=format'
    ];
  }

  function getTestimonials(productName: string) {
    const testimonials: { [key: string]: any[] } = {
      'EUP Dashboard': [
        {
          name: 'Sarah Johnson',
          company: 'TechCorp Solutions',
          role: 'HR Director',
          content: 'EUP Dashboard has revolutionized our HR operations. The automation features have saved us countless hours and the reporting capabilities give us insights we never had before.',
          rating: 5
        },
        {
          name: 'Michael Chen',
          company: 'FinanceFlow Inc',
          role: 'CFO',
          content: 'The financial management tools in EUP Dashboard are exceptional. We can now track expenses, manage budgets, and generate reports with ease.',
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
        },
        {
          name: 'David Kim',
          company: 'StartupXYZ',
          role: 'Founder',
          content: 'Undash-cop Studio helped us build a stunning website that perfectly represents our brand. The team is professional and the results speak for themselves.',
          rating: 5
        }
      ],
      'Serviso': [
        {
          name: 'Lisa Wang',
          company: 'RetailMax',
          role: 'Operations Manager',
          content: 'Serviso has streamlined our business operations significantly. The dashboard gives us real-time visibility into all aspects of our business.',
          rating: 5
        }
      ],
      'Futuro Expenses': [
        {
          name: 'James Wilson',
          company: 'Freelance Consultant',
          role: 'Independent Professional',
          content: 'Futuro Expenses has made managing my finances so much easier. The categorization and budgeting features are exactly what I needed.',
          rating: 5
        }
      ],
      'YRB Services': [
        {
          name: 'Maria Garcia',
          company: 'Enterprise Corp',
          role: 'IT Director',
          content: 'YRB Services has been instrumental in keeping our IT infrastructure running smoothly. Their proactive approach prevents issues before they become problems.',
          rating: 5
        }
      ],
      'Fotralife': [
        {
          name: 'Alex Thompson',
          company: 'Travel Enthusiast',
          role: 'Community Member',
          content: 'Fotralife has connected me with amazing people and places. The community features make travel planning so much more enjoyable.',
          rating: 5
        }
      ]
    };
    return testimonials[productName] || [];
  }

  function getFAQ(productName: string) {
    const faqs: { [key: string]: any[] } = {
      'EUP Dashboard': [
        {
          question: 'How quickly can we get started with EUP Dashboard?',
          answer: 'Most organizations can be up and running within 2-4 weeks, depending on data migration complexity and customization requirements.'
        },
        {
          question: 'Does EUP Dashboard integrate with our existing systems?',
          answer: 'Yes, EUP Dashboard offers extensive integration capabilities with over 100+ popular business applications and systems.'
        },
        {
          question: 'What kind of support do you provide?',
          answer: 'We provide 24/7 technical support, comprehensive training, and ongoing maintenance to ensure your success.'
        }
      ],
      'Undash-cop Studio': [
        {
          question: 'What technologies do you use for web development?',
          answer: 'We use modern technologies including React, Next.js, Node.js, TypeScript, and various other cutting-edge frameworks.'
        },
        {
          question: 'Do you provide ongoing maintenance and support?',
          answer: 'Yes, we offer comprehensive maintenance packages including updates, security patches, and ongoing support.'
        }
      ],
      'Serviso': [
        {
          question: 'Can Serviso scale with our growing business?',
          answer: 'Absolutely! Serviso is designed to scale from small teams to large enterprises, adapting to your changing needs.'
        }
      ],
      'Futuro Expenses': [
        {
          question: 'Is my financial data secure?',
          answer: 'Yes, we use bank-level encryption and security measures to protect your financial information.'
        }
      ],
      'YRB Services': [
        {
          question: 'What types of IT services do you provide?',
          answer: 'We provide comprehensive IT services including network management, cybersecurity, cloud solutions, and digital transformation.'
        }
      ],
      'Fotralife': [
        {
          question: 'How does the community feature work?',
          answer: 'Fotralife connects you with fellow travelers through advanced matching algorithms and social features.'
        }
      ]
    };
    return faqs[productName] || [];
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": product?.name,
    "description": product?.description,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": product?.specifications?.platform || "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "150"
    },
    "screenshot": product?.screenshots?.[0] || "",
    "featureList": product?.features,
    "provider": {
      "@type": "Organization",
      "name": "Undash-cop Private Limited",
      "url": "https://undash-cop.com"
    }
  };

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
      <SEOHead 
        title={`${product.name} - ${product.category} Solution | Undash-cop`}
        description={product.description}
        keywords={`${product.name}, ${product.category}, software solution, business tools`}
        structuredData={structuredData}
      />
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

      {/* Hero Section */}
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

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <nav className="flex space-x-8">
            {['overview', 'features', 'specifications', 'testimonials', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          {activeTab === 'overview' && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Product Overview</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.longDescription}
                </p>
              </div>

              {/* Screenshots */}
              {product.screenshots && product.screenshots.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Screenshots</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {product.screenshots.map((screenshot: string, index: number) => (
                      <div key={index} className="rounded-lg overflow-hidden shadow-lg">
                        <img 
                          src={screenshot} 
                          alt={`${product.name} screenshot ${index + 1}`}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'features' && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Features & Benefits</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Features */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <CogIcon className="w-6 h-6 mr-3 text-primary-600" />
                    All Features
                  </h3>
                  <div className="space-y-4">
                    {product.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
                    <ShieldCheckIcon className="w-6 h-6 mr-3 text-primary-600" />
                    Benefits
                  </h3>
                  <div className="space-y-4">
                    {product.benefits.map((benefit: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                        <span className="text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specifications' && product.specifications && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Specifications</h2>
              
              <div className="bg-gray-50 rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {key === 'platform' && <GlobeAltIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'deployment' && <CloudIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'users' && <UsersIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'support' && <ClockIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'security' && <LockClosedIcon className="w-6 h-6 text-primary-600" />}
                        {key === 'integration' && <ChartBarIcon className="w-6 h-6 text-primary-600" />}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 capitalize mb-1">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-gray-600">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'testimonials' && product.testimonials && product.testimonials.length > 0 && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Customer Testimonials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.testimonials.map((testimonial: any, index: number) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                    <div className="flex items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role} at {testimonial.company}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faq' && product.faq && product.faq.length > 0 && (
            <div className="max-w-4xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                {product.faq.map((item: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">{item.question}</h3>
                    <p className="text-gray-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
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

export default ProductDetail;