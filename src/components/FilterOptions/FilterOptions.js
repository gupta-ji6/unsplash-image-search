import React, { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './FilterOptions.css';

const FilterOptions = () => {
  const { setSortBy, sortBy, setColor, color, setOrientation } =
    useContext(SearchContext);

  const onSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const onColorChange = (e) => {
    setColor(e.target.value);
  };

  const onOrientationChange = (e) => {
    setOrientation(e.target.value);
  };

  const FILTER_OPTIONS = {
    sort: {
      onChangeFunction: onSortByChange,
      groupLabel: 'Sort By',
      inputs: [
        {
          id: 'sortValue1',
          name: 'sortBy',
          value: 'relevant',
          defaultChecked: true,
          label: 'Relevance',
        },
        {
          id: 'sortValue2',
          name: 'sortBy',
          value: 'latest',
          defaultChecked: false,
          label: 'Latest',
        },
      ],
    },
    color: {
      onChangeFunction: onColorChange,
      groupLabel: 'Color',
      inputs: [
        {
          id: 'colorValue1',
          name: 'color',
          value: 'any',
          defaultChecked: true,
          label: 'Any Color',
        },
        {
          id: 'colorValue2',
          name: 'color',
          value: 'black_and_white',
          defaultChecked: false,
          label: 'Black and White',
        },
      ],
    },
    orientation: {
      onChangeFunction: onOrientationChange,
      groupLabel: 'Orientation',
      inputs: [
        {
          id: 'orientationValue1',
          name: 'orientation',
          value: 'any',
          defaultChecked: true,
          label: 'Any',
        },
        {
          id: 'orientationValue2',
          name: 'orientation',
          value: 'landscape',
          defaultChecked: false,
          label: 'Landscape',
        },
        {
          id: 'orientationValue3',
          name: 'orientation',
          value: 'portrait',
          defaultChecked: false,
          label: 'Portrait',
        },
        {
          id: 'orientationValue4',
          name: 'orientation',
          value: 'squarish',
          defaultChecked: false,
          label: 'Square',
        },
      ],
    },
  };

  const onClearFilterClick = (e) => {
    // e.preventDefault();
    setColor('any');
    setOrientation('any');
    setSortBy('relevant');
  };

  //   console.log(sortBy);
  //   console.log(color);

  return (
    <div className='filter_container'>
      <div className='filterOptions_container'>
        {Object.keys(FILTER_OPTIONS).map((filter) => {
          return (
            <div
              onChange={FILTER_OPTIONS[filter].onChangeFunction}
              className='filterOptions_radio_group_container'
              key={FILTER_OPTIONS[filter].groupLabel}
            >
              <p className='filterOptions_radio_group_label'>
                {FILTER_OPTIONS[filter].groupLabel}
              </p>
              <div
                className={
                  FILTER_OPTIONS[filter].groupLabel === 'Orientation'
                    ? 'filterOptions_radio_group_grid'
                    : 'filterOptions_radio_group'
                }
              >
                {FILTER_OPTIONS[filter].inputs.map((filterInput) => (
                  <div key={filterInput.id}>
                    <input
                      type='radio'
                      id={filterInput.id}
                      name={filterInput.name}
                      value={filterInput.value}
                      className='radio_input'
                      defaultChecked={filterInput.defaultChecked}
                      //   checked={filterInput.value === sortBy}
                    />
                    <label htmlFor={filterInput.id} className='radio_label'>
                      {filterInput.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className='clear_filter_btn_container'>
        <button onClick={onClearFilterClick}>Clear Filter</button>
      </div>
    </div>
  );
};

export default FilterOptions;
