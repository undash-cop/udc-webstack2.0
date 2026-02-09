import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface HeroProps {
  title: string | ReactNode;
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
    <section className="relative overflow-hidden bg-neutral-50">
      {/* Background (optional image only) */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="relative container-custom section-padding">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <p className="text-primary-600 font-semibold text-body-lg mb-4 tracking-tight">
              {subtitle}
            </p>
          )}
          
          <h1 className="text-display md:text-display-lg lg:text-display-xl font-semibold text-neutral-900 mb-6">
            {title}
          </h1>
          
          <p className="text-body-lg text-neutral-600 mb-10 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Action Buttons */}
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {primaryAction && (
                <Link to={primaryAction.href} className="btn-primary text-body px-8 py-4">
                  {primaryAction.text}
                </Link>
              )}
              {secondaryAction && (
                <Link to={secondaryAction.href} className="btn-outline text-body px-8 py-4">
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
