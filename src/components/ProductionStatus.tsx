import { CheckCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

interface ProductionStatusProps {
  status?: 'production' | 'stable' | 'evolving';
  showIcon?: boolean;
  className?: string;
}

const ProductionStatus = ({ 
  status = 'production', 
  showIcon = true,
  className = '' 
}: ProductionStatusProps) => {
  const statusConfig = {
    production: {
      label: 'In Production',
      icon: CheckCircleIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    stable: {
      label: 'Stable',
      icon: CheckCircleIcon,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    evolving: {
      label: 'Continuously Evolving',
      icon: ArrowTrendingUpIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span 
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap ${config.color} ${config.bgColor} border ${config.borderColor} ${className}`}
    >
      {showIcon && <Icon className="w-3 h-3 flex-shrink-0" />}
      <span className="whitespace-nowrap">{config.label}</span>
    </span>
  );
};

export default ProductionStatus;
