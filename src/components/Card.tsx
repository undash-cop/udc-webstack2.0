import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  padding = 'md' 
}: CardProps) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        card
        ${paddingClasses[padding]}
        ${hover ? 'hover:shadow-soft-lg' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
