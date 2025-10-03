import { useState, useEffect } from 'react';

interface ProgressBarProps {
  percentage: number;
  label?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

const ProgressBar = ({ 
  percentage, 
  label, 
  color = 'primary', 
  size = 'md', 
  animated = true,
  className = '' 
}: ProgressBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setWidth(percentage);
    }
  }, [percentage, animated]);

  const colorClasses = {
    primary: 'from-primary-500 to-primary-600',
    secondary: 'from-gray-500 to-gray-600',
    success: 'from-green-500 to-green-600',
    warning: 'from-yellow-500 to-yellow-600',
    danger: 'from-red-500 to-red-600',
  };

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          <span className="text-sm text-gray-500">{percentage}%</span>
        </div>
      )}
      <div className={`progress-bar ${sizeClasses[size]}`}>
        <div 
          className={`progress-fill bg-gradient-to-r ${colorClasses[color]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
