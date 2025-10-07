import { memo } from 'react';
// Import only essential icons to reduce bundle size
import { 
  CheckCircleIcon,
  ShieldCheckIcon,
  CogIcon,
  CloudIcon,
  StarIcon,
  ClockIcon,
  UsersIcon,
  ChartBarIcon,
  GlobeAltIcon,
  LockClosedIcon
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

interface ProductContentProps {
  product: Product;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ProductContent = memo(({ product, activeTab, setActiveTab }: ProductContentProps) => {
  return (
    <>
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
                          loading="lazy"
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
    </>
  );
});

ProductContent.displayName = 'ProductContent';

export default ProductContent;
