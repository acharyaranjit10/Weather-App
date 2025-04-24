import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import useDebounce from '../hooks/useDebounce';

const SearchBar = ({ onSearch, theme }) => {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.trim().length >= 2) {
      onSearch(debouncedQuery);
      setIsTyping(false);
    }
  }, [debouncedQuery]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsTyping(value.length > 0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-8"
    >
      <div className={`relative flex items-center ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a city..."
          className={`w-full py-3 px-4 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none`}
        />
        <button
          className={`absolute right-0 p-3 transition-colors ${query.length >= 2 ? 'text-blue-500' : 'text-gray-400'}`}
          onClick={() => query.length >= 2 && onSearch(query)}
        >
          <FiSearch size={20} />
        </button>
      </div>
      {isTyping && query.length < 2 && (
        <p className="text-sm mt-1 text-gray-400">
          Type at least 2 characters to search
        </p>
      )}
    </motion.div>
  );
};

export default SearchBar;
