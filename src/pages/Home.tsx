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
  MagnifyingGlassIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import AIBadge from '../components/AIBadge';

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
    isAIEnhanced: feature.title.toLowerCase().includes('content') || 
                  feature.title.toLowerCase().includes('analytics') ||
                  feature.description.toLowerCase().includes('ai') ||
                  feature.description.toLowerCase().includes('translation'),
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
    "description": "Undash-cop delivers proven results. AI is a core capability across our products—used in production to improve reliability, speed, and outcomes. Established. Reliable.",
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
        title="Undash-cop - Proven Delivery. AI Built In."
        description="Undash-cop delivers proven results. AI is a core capability across our products—used in production to improve reliability, speed, and outcomes. Established. Reliable."
        keywords="software, cloud, automation, AI, startups, founders, proven delivery, engineering, SaaS, production AI"
        structuredData={structuredData}
      />
      {/* Hero Section */}
      <Hero
        title={
          <span className="flex items-center justify-center gap-3 flex-wrap">
            <span>Proven Delivery. AI Built In.</span>
          </span>
        }
        subtitle="Undash-cop — Established. AI as a core capability."
        description="We deliver software, cloud, and automation you can count on. AI is built into many of our products—used in production to improve reliability, speed, and outcomes. Build with a partner that ships real systems."
        primaryAction={{
          text: 'Work With Our Experts',
          href: '/contact'
        }}
        secondaryAction={{
          text: 'Build With Undash-cop',
          href: '/products'
        }}
      />

      {/* Stats Section */}
      <section ref={statsRef} className="section-padding bg-white border-y border-neutral-200">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-xl border border-neutral-200 bg-neutral-50/50 shadow-subtle transition-shadow duration-250 hover:shadow-soft ${
                  statsVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-3xl lg:text-4xl font-semibold text-neutral-900 mb-2 tabular-nums">
                  <AnimatedCounter 
                    end={stat.value} 
                    prefix={stat.prefix} 
                    suffix={stat.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-neutral-600 font-medium text-sm lg:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className={`text-display font-semibold text-neutral-900 mb-4 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}>
              Why <span className="text-gradient">Undash-cop</span>?
            </h2>
            <p className={`text-body-lg text-neutral-600 max-w-wide mx-auto mb-10 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.2s' }}>
              Proven, consistent execution. Engineering maturity and domain expertise. We act as a long-term technology partner—stable, reliable, built for the long run.
            </p>
            
            {/* Search and Filter */}
            <div className={`max-w-2xl mx-auto space-y-6 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.4s' }}>
              <SearchBar
                placeholder="Search services..."
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
                  className={`feature-card group p-8 text-left ${
                    featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="mb-6 flex items-start justify-between">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 transition-all duration-300 ease-out group-hover:bg-primary-100">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    {feature.isAIEnhanced && (
                      <AIBadge variant="subtle" size="sm" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-body-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-16 ${
              featuresVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`} style={{ animationDelay: '0.5s' }}>
              <div className="w-16 h-16 bg-neutral-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MagnifyingGlassIcon className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">No services match</h3>
              <p className="text-neutral-600 mb-4 text-body-sm">
                Try a different search or filter
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="text-primary-600 hover:text-primary-700 active:text-primary-800 font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-sm"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="section-padding bg-white border-t border-neutral-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <div className={`${benefitsVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
              <h2 className="text-display font-semibold text-neutral-900 mb-6">
                Built for <span className="text-gradient">Startups & Founders</span>
              </h2>
              <p className="text-body-lg text-neutral-600 mb-10 leading-relaxed">
                We deliver with consistent execution and engineering maturity. A long-term technology partner—not a one-off vendor. Domain expertise in software, cloud, and automation. Stability you can count on.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit: any, index: number) => (
                  <li
                    key={index}
                    className={`flex items-start gap-3 text-body text-neutral-700 ${
                      benefitsVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <CheckCircleIcon className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={`relative ${benefitsVisible ? 'animate-fade-in-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-8 shadow-soft transition-shadow duration-250 hover:shadow-soft-lg">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-neutral-900">Dashboard Overview</h3>
                    <span className="flex items-center gap-2 text-body-sm text-neutral-500">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full" /> Live
                    </span>
                  </div>
                  <div className="space-y-4">
                    <ProgressBar percentage={75} label="Performance" color="primary" />
                    <ProgressBar percentage={50} label="Efficiency" color="success" />
                    <ProgressBar percentage={85} label="Satisfaction" color="warning" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div className="text-center p-4 rounded-lg bg-white border border-neutral-200">
                      <div className="text-xl font-semibold text-neutral-900 tabular-nums">98%</div>
                      <div className="text-body-sm text-neutral-600">Uptime</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white border border-neutral-200">
                      <div className="text-xl font-semibold text-neutral-900 tabular-nums">2.5s</div>
                      <div className="text-body-sm text-neutral-600">Response</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-white border border-neutral-200">
                      <div className="text-xl font-semibold text-neutral-900 tabular-nums">99.9%</div>
                      <div className="text-body-sm text-neutral-600">Accuracy</div>
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
      <section className="section-padding bg-neutral-50 border-t border-neutral-200">
        <div className="container-custom">
          <NewsletterSignup variant="hero" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-900">
        <div className="container-custom text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4 flex-wrap">
            <h2 className="text-display font-semibold text-white">
              Ready to Build With Undash-cop?
            </h2>
            <div className="flex items-center gap-1.5 text-primary-400">
              <SparklesIcon className="w-6 h-6" />
            </div>
          </div>
          <p className="text-body-lg text-neutral-300 mb-10">
            Proven delivery. AI built into our products—used in production for reliability, speed, and outcomes. 
            Work with our experts—established and reliable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn-primary btn-lg inline-flex items-center justify-center"
            >
              Work With Our Experts
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/products"
              className="btn-outline-light btn-lg inline-flex items-center justify-center"
            >
              Build With Undash-cop
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
