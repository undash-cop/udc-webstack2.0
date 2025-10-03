import { useState, useEffect, useRef } from 'react';
import companyData from '../data/companyData.js';

interface HubSpotFormProps {
  formId: string;
  portalId: string;
  className?: string;
  onFormSubmitted?: () => void;
}

declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (options: {
          portalId: string;
          formId: string;
          target: string;
          region?: string;
          css?: string;
          cssClass?: string;
          submitButtonClass?: string;
          errorClass?: string;
          errorMessageClass?: string;
          onFormReady?: (form: unknown) => void;
          onFormSubmit?: (form: unknown) => void;
          onFormSubmitted?: (form: unknown) => void;
        }) => void;
      };
    };
  }
}

const HubSpotForm = ({ 
  formId, 
  portalId, 
  className = "", 
  onFormSubmitted 
}: HubSpotFormProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHubSpotScript = () => {
      return new Promise<void>((resolve, reject) => {
        // Check if script already exists
        if (document.querySelector('script[src*="js.hs-scripts.com"]')) {
          if (window.hbspt) {
            resolve();
            return;
          }
        }

        // Create script element
        const script = document.createElement('script');
        script.src = `//js.hs-scripts.com/${portalId}.js`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          console.log('HubSpot script loaded');
          resolve();
        };
        
        script.onerror = () => {
          console.error('Failed to load HubSpot script');
          reject(new Error('Failed to load HubSpot script'));
        };

        document.head.appendChild(script);
      });
    };

    const createForm = async () => {
      try {
        await loadHubSpotScript();
        
        if (window.hbspt && window.hbspt.forms && formRef.current) {
          const containerId = `hubspot-form-${Date.now()}`;
          formRef.current.id = containerId;
          
          window.hbspt.forms.create({
            portalId: portalId,
            formId: formId,
            target: `#${containerId}`,
            region: 'na1',
            onFormReady: () => {
              console.log('HubSpot form ready');
              setIsLoaded(true);
              setHasError(false);
            },
            onFormSubmit: () => {
              console.log('HubSpot form submitted');
            },
            onFormSubmitted: () => {
              console.log('HubSpot form successfully submitted');
              onFormSubmitted?.();
            }
          });
        } else {
          throw new Error('HubSpot not available');
        }
      } catch (error) {
        console.error('Error creating HubSpot form:', error);
        setHasError(true);
        setIsLoaded(false);
      }
    };

    createForm();

    return () => {
      // Cleanup
      const currentRef = formRef.current;
      if (currentRef) {
        currentRef.innerHTML = '';
      }
    };
  }, [formId, portalId, onFormSubmitted, retryCount]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setHasError(false);
    setIsLoaded(false);
  };

  if (hasError && retryCount < 3) {
    return (
      <div className="text-center p-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4" role="alert">
          <h5 className="text-lg font-semibold text-yellow-800 mb-2">Form Loading Issue</h5>
          <p className="text-yellow-700 mb-3">There was a problem loading the contact form. This might be due to network connectivity or ad blockers.</p>
          <button 
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200" 
            onClick={handleRetry}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (hasError && retryCount >= 3) {
    return (
      <div className="text-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4" role="alert">
          <h5 className="text-lg font-semibold text-red-800 mb-2">Form Unavailable</h5>
          <p className="text-red-700 mb-3">We're having trouble loading the contact form. Please try one of these alternatives:</p>
          <div className="flex flex-col gap-2">
            <a 
              href={`mailto:${companyData.address.email}`} 
              className="bg-transparent border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200"
            >
              📧 Send us an Email
            </a>
            <a 
              href={`tel:${companyData.address.phoneno}`} 
              className="bg-transparent border border-primary-600 text-primary-600 px-4 py-2 rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200"
            >
              📞 Call us directly
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`hubspot-form-container ${className}`}>
      {!isLoaded && (
        <div className="text-center p-8 bg-gray-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contact form...</p>
        </div>
      )}
      
      <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div ref={formRef} id="hubspotFormContainer" className="w-full"></div>
      </div>
    </div>
  );
};

export default HubSpotForm;
