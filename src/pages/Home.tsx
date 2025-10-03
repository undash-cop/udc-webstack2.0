import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import Hero from '../components/Hero';
import AnimatedCounter from '../components/AnimatedCounter';
import ProgressBar from '../components/ProgressBar';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import Testimonials from '../components/Testimonials';
import NewsletterSignup from '../components/NewsletterSignup';
import useScrollAnimation from '../hooks/useScrollAnimation';
import companyData from '../data/companyData.js';
import { 
  ChartBarIcon, 
  CogIcon, 
  ShieldCheckIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allFeatures = companyData.features.map((feature: any, index: number) => ({
    icon: [ChartBarIcon, CogIcon, ShieldCheckIcon, RocketLaunchIcon][index % 4],
    title: feature.title,
    description: feature.description,
    category: getFeatureCategory(feature.title, feature.description),
  }));

  function getFeatureCategory(title: string, description: string): string {
    const titleLower = title.toLowerCase();
    const descLower = description.toLowerCase();
    
    if (titleLower.includes('analytics') || descLower.includes('analytics') || descLower.includes('seo')) {
      return 'analytics';
    } else if (titleLower.includes('development') || titleLower.includes('engineering') || descLower.includes('development') || descLower.includes('software')) {
      return 'development';
    } else if (titleLower.includes('design') || titleLower.includes('ui') || titleLower.includes('ux') || descLower.includes('design')) {
      return 'design';
    } else if (titleLower.includes('financial') || titleLower.includes('finance') || descLower.includes('financial') || descLower.includes('crm')) {
      return 'finance';
    } else if (titleLower.includes('e-commerce') || titleLower.includes('ecommerce') || descLower.includes('e-commerce')) {
      return 'ecommerce';
    } else {
      return 'other';
    }
  }

  // Filter features based on search query and active filter
  const filteredFeatures = allFeatures.filter((feature: any) => {
    const matchesSearch = searchQuery === '' || 
      feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feature.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'all' || feature.category === activeFilter;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Investment', value: parseInt(companyData.revenue.totalInvest), prefix: '₹' },
    { label: 'Yearly Revenue', value: parseInt(companyData.revenue.yearlyRevenue), prefix: '₹' },
    { label: 'Growth Ratio', value: parseInt(companyData.revenue.growthRatio), suffix: '%' },
    { label: 'Products Launched', value: companyData.products.length, suffix: '+' },
  ];

  const benefits = companyData.benefits.map((benefit: any) => benefit.description);

  const filterOptions = [
    { id: 'all', label: 'All Services', count: allFeatures.length },
    { id: 'analytics', label: 'Analytics & SEO', count: allFeatures.filter((f: any) => f.category === 'analytics').length },
    { id: 'development', label: 'Development', count: allFeatures.filter((f: any) => f.category === 'development').length },
    { id: 'design', label: 'UI/UX Design', count: allFeatures.filter((f: any) => f.category === 'design').length },
    { id: 'finance', label: 'Finance & CRM', count: allFeatures.filter((f: any) => f.category === 'finance').length },
    { id: 'ecommerce', label: 'E-Commerce', count: allFeatures.filter((f: any) => f.category === 'ecommerce').length },
  ];

  const searchSuggestions = [
    'Software Development',
    'UI/UX Design',
    'Analytics Platform',
    'Content Translation',
    'SEO Services',
    'Product Engineering',
    'Financial Management',
    'E-Commerce Solutions',
    'Network Solutions',
    'IT Support'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Undash-cop",
    "description": "Leading provider of technology solutions, automation services, and digital transformation",
    "url": "https://undash-cop.com",
    "logo": "https://undash-cop.com/logos/undash-cop-studio.png",
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
    <div>
      <SEOHead
        title="Undash-cop - Technology Solutions & Automation Services"
        description="Leading provider of technology solutions, automation services, and digital transformation. Discover our innovative products and services for your business growth."
        keywords="technology solutions, automation, digital transformation, software development, business tools, AI, machine learning, cloud services"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <Hero
        title="Complete Software Solutions for Startups & Small Businesses"
        subtitle="Welcome to Undash-cop Private Limited"
        description={companyData.descriptorTag}
        primaryAction={{
          text: 'Explore Our Products',
          href: '/products'
        }}
        secondaryAction={{
          text: 'Get in Touch',
          href: '/contact'
        }}
      />

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 tech-bg cyber-grid">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                  statsVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter 
                    end={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-gray-600 font-medium text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="section-padding tech-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              Why Choose <span className="text-gradient">Undash-cop</span>?
            </h2>
            <p className={`text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              We deliver exceptional value through innovative technology solutions 
              tailored to your business needs.
            </p>
            
            {/* Search and Filter */}
            <div className={`max-w-2xl mx-auto space-y-6 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <SearchBar
                placeholder="Search our services..."
                onSearch={handleSearch}
                suggestions={searchSuggestions}
                className="w-full"
              />
              <FilterTabs
                options={filterOptions}
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                className="justify-center"
              />
            </div>
          </div>

          {filteredFeatures.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredFeatures.map((feature: any, index: number) => (
                <div
                  key={index}
                  className={`floating-card group p-8 text-center ${
                    featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 via-primary-200 to-primary-300 rounded-3xl flex items-center justify-center mx-auto group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                      <feature.icon className="w-10 h-10 text-primary-600 group-hover:text-primary-700 transition-colors duration-300" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse-custom" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm lg:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.5s' }}>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MagnifyingGlassIcon className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="py-16 lg:py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className={`${benefitsVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Built for <span className="text-gradient">Modern Businesses</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our solutions are designed to meet the evolving needs of modern businesses. 
                We combine cutting-edge technology with industry best practices to deliver 
                exceptional results.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit: any, index: number) => (
                  <div 
                    key={index} 
                    className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-white/50 transition-all duration-300 ${
                      benefitsVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <CheckCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={`relative ${benefitsVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="bg-white rounded-3xl shadow-2xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Dashboard Overview</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Live</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <ProgressBar percentage={75} label="Performance" color="primary" />
                    <ProgressBar percentage={50} label="Efficiency" color="success" />
                    <ProgressBar percentage={85} label="Satisfaction" color="warning" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-3 rounded-lg bg-primary-50">
                      <div className="text-2xl font-bold text-primary-600">98%</div>
                      <div className="text-sm text-gray-600">Uptime</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-green-50">
                      <div className="text-2xl font-bold text-green-600">2.5s</div>
                      <div className="text-sm text-gray-600">Response</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-yellow-50">
                      <div className="text-2xl font-bold text-yellow-600">99.9%</div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container-custom">
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-gray-900 via-primary-900 to-gray-800 tech-bg cyber-grid">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Undash-cop for their technology needs. 
            Let's build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center"
            >
              Start Your Project
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/products"
              className="btn-outline text-lg px-8 py-4 inline-flex items-center justify-center border-white text-white hover:bg-white hover:text-gray-900"
            >
              View Our Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
