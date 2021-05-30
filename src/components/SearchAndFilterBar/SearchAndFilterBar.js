import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './SearchAndFilterBar.css';
import searchIcon from '../../assets/icons/search.svg';

function SearchAndFilterBar() {
  const { query, setQuery, setShowFilterOptions } = useContext(SearchContext);
  console.log(query);

  const onInputValueChange = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions((oldValue) => !oldValue);
  };

  return (
    <div className='search_container'>
      <div className='search_wrapper'>
        <div className='search_bar_container'>
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
      <div>
        <button className='filter_btn' onClick={toggleFilterOptions}>
          Filter
        </button>
      </div>
    </div>
  );
}

export default SearchAndFilterBar;
