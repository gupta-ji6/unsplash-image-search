import React from 'react';
import loaderIcon from '../../assets/icons/loader.svg';
import './Loader.css';

function Loader() {
  return (
    <div className='loader_container'>
      <img src={loaderIcon} alt='loading' className='laoder_icon' />
      <div>Loading...</div>
    </div>
  );
}

export default Loader;
