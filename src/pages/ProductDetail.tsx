import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
    const foundProduct = companyData.products.find((p: { name: string }) => 
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
      'EUP Dashboard': `EUP Dashboard represents the pinnacle of integrated business management solutions, specifically engineered for modern enterprises seeking comprehensive control over their human resources and financial operations. This all-in-one platform eliminates the need for multiple disparate systems by providing a unified interface that seamlessly connects every aspect of your business operations.

Built with scalability in mind, EUP Dashboard grows with your organization, from startup to enterprise level. Our advanced analytics engine provides real-time insights into your workforce performance, financial health, and operational efficiency, enabling data-driven decision making that drives growth and profitability.

The platform's intuitive design ensures rapid adoption across your organization, while powerful automation features reduce manual workload and minimize errors. With enterprise-grade security and compliance features, EUP Dashboard ensures your sensitive data remains protected while maintaining the flexibility to adapt to your unique business processes.`,

      'Undash-cop Studio': `Undash-cop Studio is a cutting-edge web development platform that empowers businesses to create stunning, high-performance websites and web applications with unprecedented ease and efficiency. Our comprehensive suite of tools and services combines the latest web technologies with user-friendly interfaces to deliver exceptional digital experiences.

From concept to deployment, Undash-cop Studio provides everything you need to establish a powerful online presence. Our team of expert developers, designers, and strategists work collaboratively to understand your unique requirements and deliver solutions that exceed expectations.

The platform leverages modern frameworks, responsive design principles, and performance optimization techniques to ensure your website not only looks great but also performs exceptionally across all devices and platforms. With built-in SEO optimization, security features, and analytics integration, Undash-cop Studio provides a complete solution for your digital needs.`,

      'Serviso': `Serviso is a revolutionary business management platform designed to streamline operations and enhance productivity across all departments. This comprehensive solution integrates seamlessly with your existing workflows to provide real-time visibility into your business performance and automate routine tasks.

Built for businesses of all sizes, Serviso adapts to your specific industry requirements and scales with your growth. The platform's modular architecture allows you to implement only the features you need while maintaining the flexibility to expand as your requirements evolve.

With advanced reporting capabilities, automated workflows, and intelligent analytics, Serviso transforms raw data into actionable insights that drive informed decision-making. The platform's user-friendly interface ensures rapid adoption across your organization, while robust security features protect your sensitive business data.`,

      'Futuro Expenses': `Futuro Expenses is a sophisticated personal finance management application that brings clarity and control to your financial life. Designed with the modern user in mind, this comprehensive platform helps you track expenses, manage budgets, plan for the future, and achieve your financial goals with confidence.

The application's intelligent categorization system automatically sorts your transactions while learning from your spending patterns to provide increasingly accurate insights. Advanced budgeting tools help you stay on track with your financial objectives, while investment tracking features provide a complete picture of your wealth-building journey.

With bank-level security, real-time synchronization across all your devices, and powerful reporting capabilities, Futuro Expenses gives you the tools you need to take control of your financial future. The platform's intuitive design makes complex financial management accessible to users of all experience levels.`,

      'YRB Services': `YRB Services represents the future of IT service management, providing comprehensive solutions that keep your technology infrastructure running smoothly and efficiently. Our expert team combines deep technical knowledge with industry best practices to deliver services that exceed expectations and drive business success.

From network management and cybersecurity to cloud migration and digital transformation, YRB Services covers every aspect of your IT needs. Our proactive approach to service delivery ensures potential issues are identified and resolved before they impact your business operations.

With 24/7 monitoring, rapid response times, and personalized support, YRB Services provides the peace of mind that comes from knowing your technology infrastructure is in expert hands. Our scalable solutions grow with your business, ensuring you always have the right level of support and expertise.`,

      'Fotralife': `Fotralife is a vibrant travel and community platform that connects travelers with authentic local experiences and like-minded adventurers. This innovative platform goes beyond traditional travel booking to create meaningful connections and unforgettable memories.

The platform's community-driven approach ensures that every recommendation comes from real travelers who have experienced destinations firsthand. From hidden gems and local favorites to cultural insights and practical tips, Fotralife provides the authentic travel information that guidebooks can't offer.

With advanced matching algorithms, social features, and comprehensive destination guides, Fotralife makes it easy to discover new places, connect with fellow travelers, and create the perfect itinerary for your next adventure. The platform's mobile-first design ensures you have access to all features and community insights wherever your travels take you.`
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
    // Placeholder screenshots - in real implementation, these would be actual product screenshots
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
          content: 'EUP Dashboard has revolutionized our HR operations. The automation features have saved us countless hours, and the analytics provide insights we never had before.',
          rating: 5
        },
        {
          name: 'Michael Chen',
          company: 'StartupXYZ',
          role: 'CEO',
          content: 'As a growing startup, we needed a solution that could scale with us. EUP Dashboard has been perfect - it grows with our team and adapts to our changing needs.',
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
          answer: 'Most organizations can be up and running within 2-4 weeks, depending on data migration complexity and customization requirements.'
        },
        {
          question: 'Does EUP Dashboard integrate with our existing systems?',
          answer: 'Yes, EUP Dashboard offers extensive integration capabilities with over 100 popular business applications and provides custom API development for unique requirements.'
        },
        {
          question: 'What kind of support do you provide?',
          answer: 'We provide 24/7 technical support, comprehensive training for your team, and ongoing maintenance to ensure optimal performance.'
        }
      ],
      'Undash-cop Studio': [
        {
          question: 'What technologies do you use for web development?',
          answer: 'We use modern technologies including React, Next.js, Node.js, TypeScript, and various other cutting-edge frameworks based on project requirements.'
        },
        {
          question: 'Do you provide ongoing maintenance and support?',
          answer: 'Yes, we offer comprehensive maintenance packages including security updates, performance optimization, and feature enhancements.'
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
                      <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
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
                {product.testimonials.map((testimonial, index: number) => (
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
                {product.faq.map((item, index: number) => (
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
