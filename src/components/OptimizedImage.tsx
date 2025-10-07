import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fallback?: string;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '100vw',
  priority = false,
  fallback
}: OptimizedImageProps) => {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate responsive image sources
  const generateSrcSet = (baseSrc: string, widths: number[]) => {
    return widths
      .map(w => `${baseSrc}?w=${w}&q=80 ${w}w`)
      .join(', ');
  };

  // Common responsive widths for different use cases
  const getResponsiveWidths = (displayWidth?: number) => {
    if (displayWidth) {
      return [displayWidth, displayWidth * 2, displayWidth * 3];
    }
    return [48, 64, 96, 128, 256, 512];
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  // If it's an external image (like Unsplash), optimize the URL
  const optimizeExternalImage = (url: string, targetWidth: number) => {
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?w=${targetWidth}&h=${targetWidth}&fit=crop&crop=face&auto=format&q=80`;
    }
    return url;
  };

  // If it's our logo, use different sizes
  const getLogoWidths = () => {
    if (src.includes('logo.png')) {
      return [32, 48, 64, 96, 128];
    }
    return getResponsiveWidths(width);
  };

  const responsiveWidths = getLogoWidths();
  const srcSet = generateSrcSet(src, responsiveWidths);
  const optimizedSrc = width ? optimizeExternalImage(src, width) : src;

  if (imageError && fallback) {
    return (
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;