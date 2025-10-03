import { useEffect } from 'react';

interface ResourcePreloaderProps {
  resources: {
    type: 'image' | 'script' | 'style' | 'font';
    href: string;
    as?: string;
    crossorigin?: boolean;
    media?: string;
  }[];
  priority?: boolean;
}

const ResourcePreloader = ({ resources, priority = false }: ResourcePreloaderProps) => {
  useEffect(() => {
    const preloadResources = () => {
      resources.forEach((resource) => {
        const link = document.createElement('link');
        link.rel = priority ? 'preload' : 'prefetch';
        link.href = resource.href;
        
        if (resource.as) {
          link.as = resource.as;
        }
        
        if (resource.crossorigin) {
          link.crossOrigin = 'anonymous';
        }
        
        if (resource.media) {
          link.media = resource.media;
        }
        
        // Add to head
        document.head.appendChild(link);
      });
    };

    // Preload critical resources immediately
    if (priority) {
      preloadResources();
    } else {
      // Prefetch non-critical resources after page load
      const handleLoad = () => {
        setTimeout(preloadResources, 1000);
      };
      
      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, [resources, priority]);

  return null; // This component doesn't render anything
};

export default ResourcePreloader;
