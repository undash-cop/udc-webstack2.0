import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const Logo = ({ 
  variant = 'dark', 
  size = 'md', 
  showText = true, 
  className = "" 
}: LogoProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  const pixelSizes = {
    sm: 32,
    md: 48,
    lg: 64
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-2xl'
  };

  const getLogoSrc = () => {
    const sizeMap = {
      sm: '/logo-32.png',
      md: '/logo-48.png', 
      lg: '/logo-64.png'
    };
    return sizeMap[size];
  };

  return (
    <Link to="/" className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        <img
          src={getLogoSrc()}
          alt="Undash-cop Logo"
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="h-full w-full object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
      {showText && (
        <span className={`font-bold text-gray-900 ${textSizeClasses[size]} ${variant === 'light' ? 'text-white' : 'text-gray-900'}`}>
          Undash-cop
        </span>
      )}
    </Link>
  );
};

export default Logo;
