import { useState, useEffect } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onSearch: (searchTerm: string, sortOption: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('created_at_ASC');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm, sortOption);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, sortOption, onSearch]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
    onSearch(searchTerm, e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm, sortOption);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <select value={sortOption} onChange={handleSortChange}>
        <option value="created_at_ASC">Sort by Date (Ascending)</option>
        <option value="created_at_DESC">Sort by Date (Descending)</option>
        <option value="name_ASC">Sort by Name (Ascending)</option>
        <option value="name_DESC">Sort by Name (Descending)</option>
        <option value="calories_ASC">Sort by Calories (Ascending)</option>
        <option value="calories_DESC">Sort by Calories (Descending)</option>
      </select>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
