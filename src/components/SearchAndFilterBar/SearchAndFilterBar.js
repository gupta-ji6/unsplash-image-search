import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchAndFilterBar.css';
import searchIcon from '../../assets/icons/search.svg';

function SearchAndFilterBar() {
  const { query, setQuery } = useContext(SearchContext);
  console.log(query);

  const onInputValueChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <div className='search_wrapper'>
      <div className='search_container'>
        <div className='search_icon_container'>
          <img src={searchIcon} alt='search' className='search_icon' />
        </div>
        <input
          type='search'
          placeholder='Search'
          value={query}
          onChange={onInputValueChange}
          className='search_input'
        />
      </div>
    </div>
  );
}

export default SearchAndFilterBar;
