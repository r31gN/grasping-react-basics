import React from 'react';
import PropTypes from 'prop-types';
import Puppy from './Puppy';

const PuppiesList = ({
  puppies,
  onClickAdoptHandler,
  onClickDeleteHandler
}) => (
  <ul className="puppies-list u-fx u-fx-space-between">
    {puppies.map(puppy => (
      <Puppy
        key={puppy.id}
        {...puppy}
        onClickAdoptHandler={onClickAdoptHandler}
        onClickDeleteHandler={onClickDeleteHandler}
      />
    ))}
  </ul>
);

PuppiesList.propTypes = {
  puppies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      type: PropTypes.string,
      adopted: PropTypes.bool
    })
  ),
  onClickAdoptHandler: PropTypes.func.isRequired,
  onClickDeleteHandler: PropTypes.func.isRequired
};

export default React.memo(PuppiesList);
