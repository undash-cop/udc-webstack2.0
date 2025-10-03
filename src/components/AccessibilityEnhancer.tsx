import { useEffect } from 'react';

const AccessibilityEnhancer = () => {
  useEffect(() => {
    // Add skip to main content link
    const addSkipLink = () => {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.textContent = 'Skip to main content';
      skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50';
      skipLink.style.position = 'absolute';
      skipLink.style.left = '-9999px';
      skipLink.style.top = 'auto';
      skipLink.style.width = '1px';
      skipLink.style.height = '1px';
      skipLink.style.overflow = 'hidden';
      
      document.body.insertBefore(skipLink, document.body.firstChild);
    };

    // Add ARIA landmarks
    const addAriaLandmarks = () => {
      const main = document.querySelector('main');
      if (main && !main.getAttribute('role')) {
        main.setAttribute('role', 'main');
        main.id = 'main-content';
      }

      const header = document.querySelector('header');
      if (header && !header.getAttribute('role')) {
        header.setAttribute('role', 'banner');
      }

      const footer = document.querySelector('footer');
      if (footer && !footer.getAttribute('role')) {
        footer.setAttribute('role', 'contentinfo');
      }

      const nav = document.querySelector('nav');
      if (nav && !nav.getAttribute('role')) {
        nav.setAttribute('role', 'navigation');
      }
    };

    // Enhance form accessibility
    const enhanceFormAccessibility = () => {
      const forms = document.querySelectorAll('form');
      forms.forEach((form, index) => {
        if (!form.getAttribute('aria-label') && !form.getAttribute('aria-labelledby')) {
          form.setAttribute('aria-label', `Form ${index + 1}`);
        }

        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach((input) => {
          if (input.getAttribute('required') && !input.getAttribute('aria-required')) {
            input.setAttribute('aria-required', 'true');
          }

          if (input.getAttribute('aria-invalid') === null) {
            input.setAttribute('aria-invalid', 'false');
          }
        });
      });
    };

    // Enhance button accessibility
    const enhanceButtonAccessibility = () => {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((button) => {
        if (!button.getAttribute('type')) {
          button.setAttribute('type', 'button');
        }

        if (!button.getAttribute('aria-label') && !button.textContent?.trim()) {
          button.setAttribute('aria-label', 'Button');
        }
      });
    };

    // Enhance image accessibility
    const enhanceImageAccessibility = () => {
      const images = document.querySelectorAll('img');
      images.forEach((img) => {
        if (!img.getAttribute('alt')) {
          img.setAttribute('alt', '');
        }
      });
    };

    // Add focus management for modals
    const addFocusManagement = () => {
      const modals = document.querySelectorAll('[role="dialog"], .modal');
      modals.forEach((modal) => {
        const focusableElements = modal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleKeyDown = (e: Event) => {
          const keyboardEvent = e as KeyboardEvent;
          if (keyboardEvent.key === 'Tab') {
            if (keyboardEvent.shiftKey) {
              if (document.activeElement === firstElement) {
                keyboardEvent.preventDefault();
                lastElement?.focus();
              }
            } else {
              if (document.activeElement === lastElement) {
                keyboardEvent.preventDefault();
                firstElement?.focus();
              }
            }
          } else if (keyboardEvent.key === 'Escape') {
            const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]') as HTMLElement;
            closeButton?.click();
          }
        };

        modal.addEventListener('keydown', handleKeyDown);
      });
    };

    // Add high contrast mode support
    const addHighContrastSupport = () => {
      const style = document.createElement('style');
      style.textContent = `
        @media (prefers-contrast: high) {
          .bg-gray-100 { background-color: #000 !important; color: #fff !important; }
          .bg-gray-200 { background-color: #000 !important; color: #fff !important; }
          .text-gray-600 { color: #fff !important; }
          .text-gray-700 { color: #fff !important; }
          .border-gray-200 { border-color: #fff !important; }
          .border-gray-300 { border-color: #fff !important; }
        }
      `;
      document.head.appendChild(style);
    };

    // Add reduced motion support
    const addReducedMotionSupport = () => {
      const style = document.createElement('style');
      style.textContent = `
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `;
      document.head.appendChild(style);
    };

    // Initialize accessibility enhancements
    addSkipLink();
    addAriaLandmarks();
    enhanceFormAccessibility();
    enhanceButtonAccessibility();
    enhanceImageAccessibility();
    addFocusManagement();
    addHighContrastSupport();
    addReducedMotionSupport();

    // Re-run enhancements when DOM changes
    const observer = new MutationObserver(() => {
      addAriaLandmarks();
      enhanceFormAccessibility();
      enhanceButtonAccessibility();
      enhanceImageAccessibility();
      addFocusManagement();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AccessibilityEnhancer;
