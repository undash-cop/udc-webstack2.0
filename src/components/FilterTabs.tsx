interface FilterOption {
  id: string;
  label: string;
  count?: number;
  color?: string;
}

interface FilterTabsProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
  className?: string;
}

const FilterTabs = ({ 
  options, 
  activeFilter, 
  onFilterChange, 
  className = "" 
}: FilterTabsProps) => {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onFilterChange(option.id)}
          className={`
            relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-200
            ${
              activeFilter === option.id
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-xl'
                : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 shadow-lg hover:shadow-xl border border-gray-200'
            }
          `}
        >
          <span className="flex items-center space-x-2">
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={`
                  px-2 py-1 rounded-full text-xs font-bold
                  ${
                    activeFilter === option.id
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-100 text-primary-600'
                  }
                `}
              >
                {option.count}
              </span>
            )}
          </span>
          
          {/* Active indicator */}
          {activeFilter === option.id && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-bounce-in" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
