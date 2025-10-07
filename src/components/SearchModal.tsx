import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  DocumentTextIcon,
  CogIcon,
  UserGroupIcon,
  HomeIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'product' | 'blog' | 'feature';
  category?: string;
}

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Mock search data - in a real app, this would come from an API
  const searchData: SearchResult[] = [
    // Pages
    { id: 'home', title: 'Home', description: 'Main landing page with company overview', url: '/', type: 'page' },
    { id: 'products', title: 'Products', description: 'Our software solutions and services', url: '/products', type: 'page' },
    { id: 'pricing', title: 'Pricing', description: 'Plans and pricing for our services', url: '/pricing', type: 'page' },
    { id: 'about', title: 'About Us', description: 'Learn about our company and team', url: '/about', type: 'page' },
    { id: 'blog', title: 'Blog', description: 'Latest insights and technology articles', url: '/blog', type: 'page' },
    { id: 'contact', title: 'Contact', description: 'Get in touch with our team', url: '/contact', type: 'page' },
    { id: 'careers', title: 'Careers', description: 'Join our team and grow with us', url: '/careers', type: 'page' },
    { id: 'support', title: 'Support', description: 'Help center and customer support', url: '/support', type: 'page' },
    
    // Products
    { id: 'eup-dashboard', title: 'EUP Dashboard', description: 'HR and Finance management solution', url: '/products', type: 'product', category: 'HR & Finance' },
    { id: 'undash-studio', title: 'Undash-cop Studio', description: 'Web development and design platform', url: '/products', type: 'product', category: 'Web Development' },
    { id: 'serviso', title: 'Serviso', description: 'Business process automation tools', url: '/products', type: 'product', category: 'Business Tools' },
    { id: 'futuro-expenses', title: 'Futuro Expenses', description: 'Personal finance tracking app', url: '/products', type: 'product', category: 'Personal Finance' },
    { id: 'yrb-services', title: 'YRB Services', description: 'IT services and infrastructure', url: '/products', type: 'product', category: 'IT Services' },
    { id: 'fotralife', title: 'Fotralife', description: 'Travel and community platform', url: '/products', type: 'product', category: 'Travel & Community' },
    
    // Blog Posts
    { id: 'ai-business', title: 'The Future of AI in Business', description: 'How AI is transforming business operations in 2025', url: '/blog/1', type: 'blog', category: 'AI & Technology' },
    { id: 'daily-automation', title: 'Daily Automation: 10 Tasks You Can Automate', description: 'Transform your workflow with simple automation techniques', url: '/blog/7', type: 'blog', category: 'Automation' },
    { id: 'cloud-migration', title: 'Cloud Migration Best Practices', description: 'Complete guide to migrating your business to the cloud', url: '/blog/2', type: 'blog', category: 'Cloud Computing' },
    { id: 'cybersecurity', title: 'Cybersecurity for Small Businesses', description: 'Essential security measures to protect your business', url: '/blog/3', type: 'blog', category: 'Security' },
    
    // Features
    { id: 'analytics', title: 'Advanced Analytics', description: 'Real-time insights and reporting capabilities', url: '/products', type: 'feature', category: 'Analytics' },
    { id: 'automation', title: 'Process Automation', description: 'Automate repetitive tasks and workflows', url: '/products', type: 'feature', category: 'Automation' },
    { id: 'security', title: 'Enterprise Security', description: 'Bank-level security and compliance features', url: '/products', type: 'feature', category: 'Security' },
    { id: 'integration', title: 'Third-party Integrations', description: 'Connect with your favorite tools and services', url: '/products', type: 'feature', category: 'Integrations' },
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    const timeout = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        (item.category && item.category.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 8)); // Limit to 8 results
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[selectedIndex]) {
          handleResultClick(results[selectedIndex]);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleResultClick = (result: SearchResult) => {
    navigate(result.url);
    onClose();
    setQuery('');
    setResults([]);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'page': return <HomeIcon className="w-5 h-5" />;
      case 'product': return <CogIcon className="w-5 h-5" />;
      case 'blog': return <DocumentTextIcon className="w-5 h-5" />;
      case 'feature': return <UserGroupIcon className="w-5 h-5" />;
      default: return <MagnifyingGlassIcon className="w-5 h-5" />;
    }
  };

  const getResultColor = (type: string) => {
    switch (type) {
      case 'page': return 'text-blue-600';
      case 'product': return 'text-green-600';
      case 'blog': return 'text-purple-600';
      case 'feature': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-20">
        <div className="relative w-full max-w-2xl">
          {/* Search Input */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
            <div className="flex items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, products, articles..."
                className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                aria-label="Close search"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="mt-2">Searching...</p>
                </div>
              ) : query.length < 2 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <MagnifyingGlassIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p>Type at least 2 characters to search</p>
                </div>
              ) : results.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <p>No results found for "{query}"</p>
                </div>
              ) : (
                <div className="py-2">
                  {results.map((result, index) => (
                    <button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                      className={`w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 flex items-start space-x-3 ${
                        index === selectedIndex ? 'bg-gray-50 dark:bg-gray-700' : ''
                      }`}
                    >
                      <div className={`flex-shrink-0 mt-0.5 ${getResultColor(result.type)}`}>
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {result.title}
                          </p>
                          <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {result.description}
                        </p>
                        {result.category && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded">
                            {result.category}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <span>↑↓ Navigate</span>
                  <span>↵ Select</span>
                  <span>Esc Close</span>
                </div>
                <span>{results.length} result{results.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
