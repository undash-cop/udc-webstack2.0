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
            relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-out
            focus:outline-none focus:ring-2 focus:ring-primary-400/60 focus:ring-offset-2 focus:ring-offset-white
            ${
              activeFilter === option.id
                ? 'bg-primary-600 hover:bg-primary-650 active:bg-primary-700 text-white shadow-soft hover:shadow-soft-lg active:shadow-soft active:scale-[0.98]'
                : 'bg-white/80 backdrop-blur-sm text-neutral-700 hover:bg-primary-50 hover:text-primary-600 active:bg-primary-100 active:text-primary-700 shadow-soft hover:shadow-soft-lg active:shadow-soft active:scale-[0.98] border border-neutral-200 hover:border-primary-200'
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
