import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  suggestions?: string[];
  className?: string;
}

const SearchBar = ({ 
  placeholder = "Search...", 
  onSearch, 
  suggestions = [],
  className = "" 
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
    }
  }, [query, suggestions]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    setIsOpen(false);
    onSearch?.(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-neutral-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(filteredSuggestions.length > 0)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white backdrop-blur-sm border border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-200 focus:border-primary-300 transition-all duration-300 shadow-soft"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 active:text-neutral-700 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-neutral-300/60 focus:ring-offset-2 focus:ring-offset-white rounded-lg"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && filteredSuggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white backdrop-blur-md rounded-xl shadow-soft-lg border border-neutral-200 overflow-hidden">
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSearch(suggestion)}
              className="w-full px-4 py-3 text-left hover:bg-primary-50 active:bg-primary-100 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-primary-300/60 focus:ring-offset-2 focus:ring-offset-white flex items-center justify-between group"
            >
              <span className="text-neutral-700 group-hover:text-primary-600 font-medium">
                {suggestion}
              </span>
              <MagnifyingGlassIcon className="h-4 w-4 text-neutral-400 group-hover:text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
