import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

interface HeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction?: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  children?: ReactNode;
}

const Hero = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  backgroundImage,
  children,
}: HeroProps) => {
  return (
    <section className="relative overflow-hidden tech-bg">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="gradient-bg" />
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/10" />
      </div>

      {/* Content */}
      <div className="relative container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <p className="text-primary-600 font-semibold text-lg mb-4 animate-fade-in">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            {title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in">
            {description}
          </p>

          {/* Action Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in">
              {primaryAction && (
                <Link to={primaryAction.href} className="btn-primary text-lg px-8 py-4">
                  {primaryAction.text}
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.href} className="btn-outline text-lg px-8 py-4">
                  {secondaryAction.text}
                </Link>
              )}
            </div>
          )}

          {/* Additional Content */}
          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;
