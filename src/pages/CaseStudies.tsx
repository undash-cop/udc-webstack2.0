import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import Card from '../components/Card';
import { caseStudiesData, getCaseStudiesByIndustry } from '../data/caseStudiesData';
import { 
  ArrowRightIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  EyeIcon,
  HeartIcon,
  DocumentTextIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, detailed
  const [sortBy, setSortBy] = useState('recent'); // recent, popular, featured
  const [searchQuery, setSearchQuery] = useState('');

  // Use centralized data
  const caseStudies = caseStudiesData;


  const categories = ['All', 'E-Commerce', 'Healthcare', 'FinTech', 'Manufacturing', 'Education', 'Real Estate', 'Government', 'Agriculture', 'Logistics', 'Retail'];
  
  // Enhanced filtering and sorting
  const filteredStudies = getCaseStudiesByIndustry(selectedCategory).filter((study: any) => {
    const matchesSearch = searchQuery === '' || 
      study.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      study.industry.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }).sort((a: any, b: any) => {
    switch (sortBy) {
      case 'popular':
        return (b.views || 0) - (a.views || 0);
      case 'featured':
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case 'recent':
      default:
        const dateA = new Date(a.publishedDate || a.lastUpdated || 0).getTime();
        const dateB = new Date(b.publishedDate || b.lastUpdated || 0).getTime();
        return dateB - dateA;
    }
  });

  const featuredStudies = caseStudies.filter(study => study.featured);

  return (
    <div>
      <SEOHead
        title="Case Studies - Success Stories & Project Showcases"
        description="Explore our portfolio of successful projects across various industries. See how we've helped businesses transform their operations with innovative technology solutions."
        keywords="case studies, success stories, project portfolio, technology solutions, business transformation, software development"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Success Stories & Case Studies
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover how we've helped businesses across various industries transform their operations 
            with innovative technology solutions. Each case study showcases real results and measurable impact.
          </p>
          

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search case studies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="featured">Featured</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-3 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <ChartBarIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-3 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white text-gray-700'}`}
                >
                  <DocumentTextIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-600">Our most impactful and successful project implementations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredStudies.map((study: any) => (
              <Link key={study.id} to={`/case-studies/${study.id}`} className="block group">
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group-hover:scale-105">
                <div className="relative">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="w-4 h-4 mr-1" />
                      {study.duration}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{study.title}</h3>
                  <p className="text-gray-600 mb-6">{study.challenge}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{study.teamSize}</span>
                    </div>
                    <div className="flex items-center">
                      <CurrencyDollarIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{study.budget}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Results:</h4>
                    <ul className="space-y-1">
                      {study.results.slice(0, 2).map((result: any, index: number) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {study.technologies.slice(0, 3).map((tech: any, index: number) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                      {study.technologies.length > 3 && (
                        <span className="text-gray-500 text-xs">+{study.technologies.length - 3} more</span>
                      )}
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 font-medium flex items-center">
                      Read Full Case Study
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse by Industry</h2>
            <p className="text-gray-600">Filter case studies by industry to find relevant examples</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category: any) => (
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

      {/* All Case Studies */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {selectedCategory === 'All' ? 'All Case Studies' : `${selectedCategory} Projects`}
            </h2>
            <p className="text-lg text-gray-600">
              {filteredStudies.length} case study{filteredStudies.length !== 1 ? 'ies' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredStudies.map((study: any) => (
              <Link 
                key={study.id} 
                to={`/case-studies/${study.id}`} 
                className="block group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border border-gray-200 group-hover:border-primary-300 group-hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-48 object-cover"
                    />
                    {study.featured && (
                      <div className="absolute top-4 left-4 bg-primary-600 text-white px-2 py-1 rounded text-xs font-medium">
                        Featured
                      </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <EyeIcon className="h-3 w-3" />
                        {study.views || 0}
                      </div>
                      <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <HeartIcon className="h-3 w-3" />
                        {study.likes || 0}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm font-medium">
                        {study.industry}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        {study.duration}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{study.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{study.challenge}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Results:</h4>
                      <ul className="space-y-1">
                        {study.results.slice(0, 2).map((result: any, index: number) => (
                          <li key={index} className="flex items-center text-xs text-gray-600">
                            <CheckCircleIcon className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {study.technologies.slice(0, 2).map((tech: any, index: number) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                        {study.technologies.length > 2 && (
                          <span className="text-gray-500 text-xs">+{study.technologies.length - 2}</span>
                        )}
                      </div>
                      <div className="text-primary-600 group-hover:text-primary-700 font-medium text-sm flex items-center transition-colors">
                        View Details
                        <ArrowRightIcon className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Success Story?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business with innovative technology solutions. 
            Join the ranks of our successful clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              Start Your Project
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/pricing"
              className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors inline-flex items-center justify-center"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CaseStudies;
