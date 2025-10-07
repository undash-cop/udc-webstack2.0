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
      .map(w => {
        if (baseSrc.includes('unsplash.com')) {
          const baseUrl = baseSrc.split('?')[0];
          const quality = w <= 64 ? 90 : 80;
          return `${baseUrl}?w=${w}&h=${w}&fit=crop&crop=face&fm=webp&q=${quality} ${w}w`;
        }
        return `${baseSrc}?w=${w}&q=80 ${w}w`;
      })
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
      // Use WebP format for better compression, higher quality for small images
      const quality = targetWidth <= 64 ? 90 : 80;
      return `${baseUrl}?w=${targetWidth}&h=${targetWidth}&fit=crop&crop=face&fm=webp&q=${quality}`;
    }
    return url;
  };

  // Generate fallback URL for browsers that don't support WebP
  const getFallbackUrl = (url: string, targetWidth: number) => {
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      const quality = targetWidth <= 64 ? 90 : 80;
      return `${baseUrl}?w=${targetWidth}&h=${targetWidth}&fit=crop&crop=face&q=${quality}`;
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

  // For Unsplash images, use picture element with WebP and fallback
  if (src.includes('unsplash.com')) {
    const fallbackSrc = getFallbackUrl(src, width || 64);
    const webpSrcSet = generateSrcSet(src, responsiveWidths);
    const fallbackSrcSet = generateSrcSet(src, responsiveWidths).replace(/fm=webp&/g, '');
    
    return (
      <div className={`relative ${className}`}>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
        )}
        <picture>
          <source srcSet={webpSrcSet} sizes={sizes} type="image/webp" />
          <img
            src={fallbackSrc}
            srcSet={fallbackSrcSet}
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
        </picture>
      </div>
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