import { useState, useEffect } from 'react';
import { XMarkIcon, CogIcon, CheckIcon } from '@heroicons/react/24/outline';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setPreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setIsVisible(false);
    
    // Initialize analytics if accepted
    if (allAccepted.analytics) {
      // This would initialize Google Analytics or other tracking
      console.log('Analytics cookies accepted');
    }
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify(preferences));
    setIsVisible(false);
    
    // Initialize analytics if accepted
    if (preferences.analytics) {
      console.log('Analytics cookies accepted');
    }
  };

  const handlePreferenceChange = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Can't change necessary cookies
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="container-custom py-6">
        {!showPreferences ? (
          // Main consent banner
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                We use cookies to enhance your experience
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                We use cookies to improve your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium flex items-center"
              >
                <CogIcon className="w-4 h-4 mr-2" />
                Customize
              </button>
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-medium"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          // Preferences panel
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Cookie Preferences
              </h3>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Necessary Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies are essential for the website to function properly. They cannot be disabled.
                  </p>
                </div>
                <div className="flex items-center ml-4">
                  <CheckIcon className="w-5 h-5 text-green-500" />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Analytics Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('analytics')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.analytics ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Marketing Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('marketing')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.marketing ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Functional Cookies
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                  </p>
                </div>
                <button
                  onClick={() => handlePreferenceChange('functional')}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    preferences.functional ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      preferences.functional ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRejectAll}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium"
              >
                Reject All
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-medium"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
