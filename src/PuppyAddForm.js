import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PuppyAddForm = ({ onClickSaveHandler }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  return (
    <div className="u-mb-double u-fx u-fx-justify-center">
      <div className="puppy-add-form">
        <div className="u-fx u-fx-align-center u-mb-full">
          <label className="puppy-add-form__label">Name:</label>
          <input
            name="name"
            className="puppy-add-form__input u-pa-half"
            type="text"
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="u-fx u-fx-align-center  u-mb-full">
          <label className="puppy-add-form__label">Type:</label>
          <input
            name="type"
            className="puppy-add-form__input u-pa-half"
            type="text"
            onChange={e => setType(e.target.value)}
          />
        </div>
        <button
          className="puppy-save-btn u-pa-half"
          onClick={() =>
            onClickSaveHandler({
              name,
              type,
              adopted: false
            })
          }
        >
          Save puppy
        </button>
      </div>
    </div>
  );
};

PuppyAddForm.propTypes = {
  onClickSaveHandler: PropTypes.func.isRequired
};

export default React.memo(PuppyAddForm);
