import { useContext } from 'react';
import './App.css';
import FilterOptions from './components/FilterOptions/FilterOptions';
import Header from './components/Header/Header';
import ImageGrid from './components/ImageGrid/ImageGrid';
import SearchAndFilterBar from './components/SearchAndFilterBar/SearchAndFilterBar';
import { SearchContext } from './context/SearchContext';

function App() {
  const { showFilterOptions } = useContext(SearchContext);
  return (
    <div className='App'>
      <Header />
      <SearchAndFilterBar />
      {showFilterOptions ? <FilterOptions /> : null}
      <ImageGrid />
    </div>
  );
}

export default App;
