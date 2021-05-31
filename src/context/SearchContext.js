import React, { useState } from 'react';

const SearchContext = React.createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [sortBy, setSortBy] = useState('relevant');
  const [color, setColor] = useState('any');
  const [orientation, setOrientation] = useState('any');

  const contextValue = {
    query,
    setQuery,
    data,
    setData,
    showFilterOptions,
    setShowFilterOptions,
    sortBy,
    setSortBy,
    color,
    setColor,
    orientation,
    setOrientation,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
