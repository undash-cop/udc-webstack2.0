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
        // Check if HubSpot is already available
        if (window.hbspt && window.hbspt.forms) {
          console.log('HubSpot already available');
          resolve();
          return;
        }

        // Try loading the forms API directly (more reliable)
        const loadFormsAPI = () => {
          const formsScript = document.createElement('script');
          formsScript.src = 'https://js.hsforms.net/forms/embed/v2.js';
          formsScript.async = true;
          formsScript.defer = true;
          
          formsScript.onload = () => {
            console.log('HubSpot forms API loaded');
            // Wait for hbspt object with longer timeout
            let attempts = 0;
            const maxAttempts = 100; // 10 seconds total
            
            const checkHubSpot = () => {
              attempts++;
              if (window.hbspt && window.hbspt.forms) {
                console.log('HubSpot hbspt object available');
                resolve();
              } else if (attempts >= maxAttempts) {
                console.error('HubSpot hbspt object not available after maximum attempts');
                reject(new Error('HubSpot forms API loaded but hbspt object not available after timeout'));
              } else {
                setTimeout(checkHubSpot, 100);
              }
            };
            
            checkHubSpot();
          };
          
          formsScript.onerror = () => {
            console.error('Failed to load HubSpot forms API');
            reject(new Error('Failed to load HubSpot forms API'));
          };
          
          document.head.appendChild(formsScript);
        };

        // Check if script already exists
        const existingScript = document.querySelector('script[src*="js.hsforms.net"]');
        if (existingScript) {
          // Wait for the existing script to load
          let attempts = 0;
          const maxAttempts = 100;
          
          const checkHubSpot = () => {
            attempts++;
            if (window.hbspt && window.hbspt.forms) {
              console.log('HubSpot loaded from existing script');
              resolve();
            } else if (attempts >= maxAttempts) {
              console.log('Existing script found but hbspt not available, loading new script');
              loadFormsAPI();
            } else {
              setTimeout(checkHubSpot, 100);
            }
          };
          checkHubSpot();
          return;
        }

        // Load the forms API directly
        loadFormsAPI();
      });
    };

    const createForm = async () => {
      try {
        // Add timeout to prevent infinite waiting
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('HubSpot script loading timeout')), 10000);
        });

        await Promise.race([loadHubSpotScript(), timeoutPromise]);
        
        if (window.hbspt && window.hbspt.forms && formRef.current) {
          const containerId = `hubspot-form-${Date.now()}`;
          formRef.current.id = containerId;
          
          console.log('Creating HubSpot form with:', { portalId, formId, containerId });
          
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
          console.error('HubSpot not available:', { 
            hbspt: !!window.hbspt, 
            forms: !!(window.hbspt && window.hbspt.forms),
            formRef: !!formRef.current 
          });
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
            className="btn-primary text-sm" 
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
              className="btn-outline text-sm"
            >
              📧 Send us an Email
            </a>
            <a 
              href={`tel:${companyData.address.phoneno}`} 
              className="btn-outline text-sm"
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
        <div className="text-center p-8 bg-neutral-50 rounded-lg">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading contact form...</p>
        </div>
      )}
      
      <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div ref={formRef} id="hubspotFormContainer" className="w-full"></div>
      </div>
    </div>
  );
};

export default HubSpotForm;
