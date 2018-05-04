import React from 'react';
import PropTypes from 'prop-types';

const Puppy = ({
  id,
  name,
  type,
  adopted,
  onClickAdoptHandler,
  onClickDeleteHandler
}) => (
  <li className="puppies-list__item u-pa-double">
    <div className="u-mb-double">
      <p>Name: {name}</p>
      <p>Type: {type}</p>
      <p>Adopted: {adopted ? 'True' : 'False'}</p>
    </div>
    <div>
      <button
        className={`puppies-list__item__adopt-btn u-pa-half u-mr-double ${
          adopted ? 'adopted' : 'not-adopted'
        }`}
        onClick={() => onClickAdoptHandler(id)}
      >
        {adopted ? 'Cancel Adoption' : 'Adopt me!'}
      </button>
      <button
        className="puppies-list__item__delete-btn u-pa-half"
        onClick={() => onClickDeleteHandler(id)}
      >
        Delete puppy
      </button>
    </div>
  </li>
);

Puppy.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  adopted: PropTypes.bool,
  onClickAdoptHandler: PropTypes.func.isRequired,
  onClickDeleteHandler: PropTypes.func.isRequired
};

export default Puppy;
