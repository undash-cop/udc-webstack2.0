import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Logo from '../components/Logo';
import SearchModal from '../components/SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && e.ctrlKey) {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      // Only close if clicking outside the dropdown and not on a dropdown trigger
      if (!target.closest('[data-dropdown]') && !target.closest('[data-dropdown-trigger]')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { 
      name: 'Resources', 
      href: '#',
      dropdown: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Resource Center', href: '/resources' }
      ]
    },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky-nav ${isScrolled ? 'sticky-nav-scrolled' : 'bg-white shadow-lg'} top-0 z-50 transition-all duration-300`}>
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo variant="dark" size="md" showText={true} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <div
                    className="flex items-center space-x-1 cursor-pointer"
                    data-dropdown-trigger
                    onMouseEnter={() => {
                      if (dropdownTimeout) {
                        clearTimeout(dropdownTimeout);
                        setDropdownTimeout(null);
                      }
                      setActiveDropdown(item.name);
                    }}
                    onMouseLeave={() => {
                      const timeout = setTimeout(() => {
                        setActiveDropdown(null);
                      }, 150);
                      setDropdownTimeout(timeout);
                    }}
                  >
                    <span className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      item.dropdown.some(subItem => isActive(subItem.href))
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}>
                      {item.name}
                    </span>
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                    
                    {/* Dropdown Menu */}
                    {activeDropdown === item.name && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50" 
                        data-dropdown
                        onMouseEnter={() => {
                          if (dropdownTimeout) {
                            clearTimeout(dropdownTimeout);
                            setDropdownTimeout(null);
                          }
                        }}
                        onMouseLeave={() => {
                          const timeout = setTimeout(() => {
                            setActiveDropdown(null);
                          }, 150);
                          setDropdownTimeout(timeout);
                        }}
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              isActive(subItem.href)
                                ? 'text-primary-600 bg-primary-50'
                                : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors"
              title="Search (Ctrl+/)"
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
            </button>
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:text-primary-600"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden mobile-menu ${isMenuOpen ? 'mobile-menu-open' : 'mobile-menu-closed'}`}>
          <div className="flex items-center justify-between p-4 border-b">
            <div onClick={() => setIsMenuOpen(false)} style={{ cursor: 'pointer' }}>
              <Logo 
                variant="dark" 
                size="sm" 
                showText={true} 
                className="text-gray-900"
              />
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div data-dropdown>
                    <button
                      data-dropdown-trigger
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        item.dropdown.some(subItem => isActive(subItem.href))
                          ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${
                        activeDropdown === item.name ? 'rotate-180' : ''
                      }`} />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="ml-4 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive(subItem.href)
                                ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                                : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                            }`}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setActiveDropdown(null);
                            }}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full flex items-center justify-center px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              Search
            </button>
            <Link
              to="/contact"
              className="block w-full text-center btn-primary mt-6"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
