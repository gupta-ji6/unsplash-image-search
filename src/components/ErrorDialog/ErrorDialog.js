import React from 'react';
import emptyListIcon from '../../assets/icons/empty.svg';
import './ErrorDialog.css';

function ErrorDialog({ error }) {
  return (
    <div className='no_results_container'>
      <img
        src={emptyListIcon}
        alt='no result found'
        className='no_results_image'
      />
      <div>No Result Found.</div>
      <div>Try searching for another term.</div>
      {error !== null ? <div>{error}</div> : null}
    </div>
  );
}

export default ErrorDialog;
