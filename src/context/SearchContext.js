import React, { useState } from 'react';

const SearchContext = React.createContext();

function SearchProvider({ children }) {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);

  const contextValue = {
    query,
    setQuery,
    data,
    setData,
  };

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
