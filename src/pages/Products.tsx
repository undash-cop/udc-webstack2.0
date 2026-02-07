import Card from '../components/Card';
import useScrollAnimation from '../hooks/useScrollAnimation';
import companyData from '../data/companyData.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  CogIcon,
  CloudIcon,
  XMarkIcon,
  EyeIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Product {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  logo: string;
  features: string[];
  benefits: string[];
  pricing: string;
  category: string;
  link: string;
}

interface CompanyProduct {
  name: string;
  description: string;
  photo: string;
  link: string;
  features?: string[];
  benefits?: string[];
}


const Products = () => {
  const { ref: productsRef, isVisible: productsVisible } = useScrollAnimation();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const products: Product[] = companyData.products.map((product: CompanyProduct) => ({
    id: product.name.toLowerCase().replace(/\s+/g, '-'),
    name: product.name,
    tagline: (product as any).tagline,
    description: product.description,
    logo: product.photo,
    features: product.features || [
      'Complete solution',
      'User-friendly interface',
      '24/7 support',
      'Regular updates',
      'Mobile responsive',
      'Secure & reliable'
    ],
    benefits: product.benefits || [
      'High Performance',
      'Cost Effective',
      'Easy to Use',
      'Scalable Solution'
    ],
    pricing: getProductCategory(product.name) === 'Open Source' ? 'Free / Open Source' : 'Contact for pricing',
    category: getProductCategory(product.name),
    link: product.link
  }));

  function getProductCategory(productName: string): string {
    const categoryMap: { [key: string]: string } = {
      'EUP Dashboard': 'HR & Finance',
      'Undash-cop Studio': 'Web Development',
      'Serviso': 'Business Tools',
      'Futuro Expenses': 'Personal Finance',
      'YRB Services': 'IT Services',
      'Fotralife': 'Travel & Community',
      'Aurum Signal': 'AI & Communication',
      'RecruitAI': 'AI + ATS',
      'Game Of Coders': 'AI & Interview Tools',
      'My Macros': 'Health & Fitness (Beta)',
      'Metrics Billing Platform': 'Open Source'
    };
    return categoryMap[productName] || 'Software Solutions';
  }

  const categories = ['All', 'HR & Finance', 'Web Development', 'Business Tools', 'Personal Finance', 'IT Services', 'Travel & Community', 'AI & Communication', 'AI + ATS', 'AI & Interview Tools', 'Health & Fitness (Beta)', 'Open Source'];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom text-center">
          <h1 className="text-display md:text-display-lg font-semibold text-neutral-900 mb-6">
            Our Products & Solutions
          </h1>
          <p className="text-body-lg text-neutral-600 max-w-3xl mx-auto mb-8">
            Proven delivery. AI is a core capability across many of our products—used in production to improve reliability, speed, and outcomes. Built for startups, growing businesses, and founders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full border transition-colors duration-200 ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'border-primary-200 text-primary-700 hover:bg-primary-600 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section ref={productsRef} className="section-padding bg-white">
        <div className="container-custom">
          <div className="space-y-8">
            {filteredProducts.map((product: Product, index: number) => (
              <div
                key={product.id}
                className={`card overflow-hidden ${
                  productsVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Product Image/Logo Section */}
                  <div className="bg-neutral-50 p-6 lg:p-8 flex items-center justify-center border-b border-neutral-200">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 border border-neutral-200 shadow-soft">
                        <img 
                          src={product.logo} 
                          alt={`${product.name} logo`}
                          className="w-24 h-24 object-contain"
                        />
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2">{product.name}</h3>
                      {product.tagline && (
                        <p className="text-sm text-primary-600 font-medium mb-2 italic">
                          {product.tagline}
                        </p>
                      )}
                      <span className="inline-block px-3 py-1 bg-primary-600 text-white text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  {/* Product Details Section */}
                  <div className="p-6 lg:p-8">
                    <div className="mb-4">
                      <p className="text-neutral-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {product.description.length > 150 
                          ? `${product.description.substring(0, 150)}...` 
                          : product.description
                        }
                      </p>
                    </div>

                    {/* Features & Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center">
                          <CogIcon className="w-4 h-4 mr-2 text-primary-600" />
                          Key Features
                        </h4>
                        <div className="space-y-2">
                          {product.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                            <div key={featureIndex} className="flex items-start space-x-2">
                              <CheckCircleIcon className="w-3 h-3 text-green-500 flex-shrink-0 mt-1" />
                              <span className="text-xs text-neutral-600">{feature}</span>
                            </div>
                          ))}
                          {product.features.length > 3 && (
                            <div className="text-xs text-primary-600 font-medium">
                              +{product.features.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Benefits */}
                      <div>
                        <h4 className="text-sm font-semibold text-neutral-900 mb-3 flex items-center">
                          <ShieldCheckIcon className="w-4 h-4 mr-2 text-primary-600" />
                          Benefits
                        </h4>
                        <div className="space-y-2">
                          {product.benefits.slice(0, 3).map((benefit: string, benefitIndex: number) => (
                            <div key={benefitIndex} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5"></div>
                              <span className="text-xs text-neutral-600">{benefit}</span>
                            </div>
                          ))}
                          {product.benefits.length > 3 && (
                            <div className="text-xs text-primary-600 font-medium">
                              +{product.benefits.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={`/products/${product.id}`}
                        className="btn-primary flex-1 flex items-center justify-center text-sm"
                      >
                        <EyeIcon className="w-4 h-4 mr-2" />
                        View Details
                      </Link>
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline flex-1 flex items-center justify-center text-sm"
                      >
                        Try Now
                        <ArrowRightIcon className="w-4 h-4 ml-2" />
                      </a>
                    </div>

                    {/* Pricing */}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary-600">
                          {product.pricing}
                        </span>
                        <div className="flex items-center text-xs text-neutral-500">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          <span>Available Now</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Solutions */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Custom development, integration, and cloud migration for growing and enterprise teams.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheckIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Custom Development
              </h3>
              <p className="text-neutral-600 mb-4">
                Custom software built for your requirements—engineering-first, stable delivery.
              </p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Dedicated development team</li>
                <li>• Agile methodology</li>
                <li>• Regular progress updates</li>
                <li>• Post-launch support</li>
              </ul>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                System Integration
              </h3>
              <p className="text-neutral-600 mb-4">
                Integrate our products with your existing systems and workflows.
              </p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Legacy system integration</li>
                <li>• API development</li>
                <li>• Data migration</li>
                <li>• Training & documentation</li>
              </ul>
            </Card>

            <Card className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CloudIcon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Cloud Migration
              </h3>
              <p className="text-neutral-600 mb-4">
                Migrate to the cloud with minimal downtime and strong security practices.
              </p>
              <ul className="text-sm text-neutral-600 space-y-1">
                <li>• Cloud architecture design</li>
                <li>• Data migration strategy</li>
                <li>• Security implementation</li>
                <li>• Performance optimization</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="heading-section text-white mb-0">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Contact us to discuss your requirements and find the right fit for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-secondary btn-lg inline-flex items-center justify-center"
            >
              Contact Sales
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/contact"
              className="btn-outline-light btn-lg inline-flex items-center justify-center"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
              <h2 className="heading-section mb-0">{selectedProduct.name}</h2>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 hover:bg-neutral-100 rounded-full transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6 text-neutral-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Info */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 bg-primary-50 rounded-xl flex items-center justify-center mr-4">
                      <img 
                        src={selectedProduct.logo} 
                        alt={`${selectedProduct.name} logo`}
                        className="w-16 h-16 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-neutral-900">{selectedProduct.name}</h3>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-600 text-sm font-medium rounded-full">
                        {selectedProduct.category}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    {selectedProduct.description}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={selectedProduct.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary flex-1 flex items-center justify-center"
                    >
                      Try Now
                      <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </a>
                    <div className="flex-1 text-center py-3 px-6 border border-neutral-300 rounded-lg">
                      <span className="text-lg font-semibold text-primary-600">
                        {selectedProduct.pricing}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features & Benefits */}
                <div className="space-y-8">
                  {/* All Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <CogIcon className="w-5 h-5 mr-2 text-primary-600" />
                      All Features
                    </h4>
                    <div className="space-y-3">
                      {selectedProduct.features.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-neutral-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* All Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                      <ShieldCheckIcon className="w-5 h-5 mr-2 text-primary-600" />
                      All Benefits
                    </h4>
                    <div className="space-y-3">
                      {selectedProduct.benefits.map((benefit: string, benefitIndex: number) => (
                        <div key={benefitIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2"></div>
                          <span className="text-neutral-600">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
