import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import companyData from '../data/companyData.js';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/about#team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Help Center', href: '/support' },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy-policy', external: false },
      { name: 'Terms & Conditions', href: '/terms-and-conditions', external: false },
      { name: 'Refund Policy', href: '/refund-policy', external: false },
      { name: 'Cookie Policy', href: '/cookies', external: false },
    ],
  };

  // Custom SVG Icons for Social Media
  const FacebookIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );

  const TwitterIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
    </svg>
  );

  const LinkedInIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  const InstagramIcon = () => (
    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );

  const socialLinks = [
    { 
      name: 'Facebook', 
      href: companyData.address.facebook, 
      icon: FacebookIcon,
      color: 'hover:text-blue-500'
    },
    { 
      name: 'Twitter', 
      href: companyData.address.twitter, 
      icon: TwitterIcon,
      color: 'hover:text-blue-400'
    },
    { 
      name: 'LinkedIn', 
      href: companyData.address.linkedin, 
      icon: LinkedInIcon,
      color: 'hover:text-blue-600'
    },
    { 
      name: 'Instagram', 
      href: companyData.address.instagram, 
      icon: InstagramIcon,
      color: 'hover:text-pink-500'
    },
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom">
        {/* Main Footer Content */}
        <div className="section-padding grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Logo variant="light" size="md" showText={true} className="mb-6" />
            <p className="text-neutral-400 text-body mb-8 max-w-md leading-relaxed">
              {companyData.descriptorTag}
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <EnvelopeIcon className="h-5 w-5 text-neutral-500 shrink-0" />
                <a 
                  href={`mailto:${companyData.address.email}`}
                  className="text-neutral-300 hover:text-primary-400 active:text-primary-500 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm"
                >
                  {companyData.address.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <PhoneIcon className="h-5 w-5 text-neutral-500 shrink-0" />
                <a 
                  href={`tel:${companyData.address.phoneno}`}
                  className="text-neutral-300 hover:text-primary-400 active:text-primary-500 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm"
                >
                  {companyData.address.phoneno}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPinIcon className="h-5 w-5 text-neutral-500 shrink-0" />
                <span className="text-neutral-400">Hoskote, Karnataka, India</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-body font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 active:text-primary-500 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm text-body-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-body font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-primary-400 active:text-primary-500 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm text-body-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-neutral-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p className="text-neutral-500 text-body-sm">
                © {currentYear} Undash-cop. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {footerLinks.legal.map((link) => (
                  link.external ? (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-primary-400 active:text-primary-500 text-body-sm transition-all duration-300 ease-out hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm"
                    >
                      {link.name}
                      <svg className="inline-block w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={link.href}
                      className="text-neutral-500 hover:text-primary-400 active:text-primary-500 text-body-sm transition-all duration-300 ease-out hover:underline focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 rounded-sm"
                    >
                      {link.name}
                    </Link>
                  )
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-neutral-500 ${social.color} transition-all duration-300 ease-out p-2 rounded-lg hover:bg-neutral-800 active:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-400/40 focus:ring-offset-2 focus:ring-offset-neutral-900 active:scale-[0.98]`}
                    aria-label={social.name}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
