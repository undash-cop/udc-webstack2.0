import { SparklesIcon } from '@heroicons/react/24/outline';

interface AIBadgeProps {
  variant?: 'default' | 'subtle' | 'inline';
  size?: 'sm' | 'md';
  className?: string;
}

const AIBadge = ({ variant = 'default', size = 'sm', className = '' }: AIBadgeProps) => {
  const baseClasses = 'inline-flex items-center gap-1.5 font-medium';
  
  const variantClasses = {
    default: 'text-primary-600 bg-primary-50 px-2.5 py-1 rounded-lg border border-primary-100',
    subtle: 'text-neutral-600 bg-neutral-50 px-2 py-0.5 rounded-md',
    inline: 'text-primary-600'
  };

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      <SparklesIcon className={iconSizes[size]} />
      <span>AI-powered</span>
    </span>
  );
};

export default AIBadge;
