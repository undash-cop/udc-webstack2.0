import { useState } from 'react';
import LazyImage from './LazyImage';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  blurDataURL?: string;
  priority?: boolean;
}

const ImageOptimizer = ({
  src,
  alt,
  className = '',
  blurDataURL
}: ImageOptimizerProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${src}`);
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{ backgroundImage: `url(${blurDataURL})` }}
        />
      )}
      
      {/* Main image */}
      <LazyImage
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        placeholder={blurDataURL || undefined}
        onLoad={handleLoad}
        onError={handleError}
      />
      
      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
};

export default ImageOptimizer;
