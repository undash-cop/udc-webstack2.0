import { useState } from 'react';
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';
import { trackFormSubmission, trackEngagement } from '../hooks/useAnalytics';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'hero';
  className?: string;
}

const NewsletterSignup = ({ variant = 'default', className = '' }: NewsletterSignupProps) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Track form submission attempt
    trackEngagement('newsletter_signup_attempt', variant);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Track successful subscription
      trackFormSubmission('newsletter', true);
      trackEngagement('newsletter_signup_success', variant);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckIcon className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank you for subscribing!</h3>
        <p className="text-gray-600">You'll receive our latest updates and insights directly in your inbox.</p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`bg-primary-50 rounded-lg p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-600">Get the latest news and insights</p>
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {isLoading ? '...' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`text-center ${className}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Stay in the Loop
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Get the latest updates, insights, and exclusive content delivered straight to your inbox. 
          Join our community of innovators and thought leaders.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            No spam, unsubscribe at any time. We respect your privacy.
          </p>
        </form>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 ${className}`}>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">
          Subscribe to Our Newsletter
        </h3>
        <p className="text-primary-100 mb-6">
          Get the latest technology insights, product updates, and industry news delivered to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-600 disabled:opacity-50"
            >
              {isLoading ? '...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-sm text-primary-200 mt-3">
            Join 10,000+ subscribers. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterSignup;
