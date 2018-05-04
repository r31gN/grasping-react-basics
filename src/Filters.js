import React from 'react';
import PropTypes from 'prop-types';

const Filters = ({ currentFilter, onChangeFilterHandler }) => (
  <div className="filters">
    <span className="u-mr-half">Change filters:</span>
    <select onChange={onChangeFilterHandler} value={currentFilter}>
      <option value="ALL">All</option>
      <option value="ADOPTED">Adopted</option>
      <option value="NOT_ADOPTED">Not Adopted</option>
    </select>
  </div>
);

Filters.propTypes = {
  currentFilter: PropTypes.oneOf(['ALL', 'ADOPTED', 'NOT_ADOPTED']),
  onChangeFilterHandler: PropTypes.func.isRequired
};

export default Filters;
