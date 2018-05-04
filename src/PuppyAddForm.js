import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PuppyAddForm extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      type: ''
    };
  }

  _onChangeInputHandler = e => {
    const key = e.target.name;
    const { value } = e.target;

    this.setState(() => ({ [key]: value }));
  };

  _onClickSaveHandler = () =>
    this.props.onClickSaveHandler({
      ...this.state,
      adopted: false
    });

  render = () => (
    <div className="u-mb-double u-fx u-fx-justify-center">
      <div className="puppy-add-form">
        <div className="u-fx u-fx-align-center u-mb-full">
          <label className="puppy-add-form__label">Name:</label>
          <input
            name="name"
            className="puppy-add-form__input u-pa-half"
            type="text"
            onChange={this._onChangeInputHandler}
          />
        </div>
        <div className="u-fx u-fx-align-center  u-mb-full">
          <label className="puppy-add-form__label">Type:</label>
          <input
            name="type"
            className="puppy-add-form__input u-pa-half"
            type="text"
            onChange={this._onChangeInputHandler}
          />
        </div>
        <button
          className="puppy-save-btn u-pa-half"
          onClick={this._onClickSaveHandler}
        >
          Save puppy
        </button>
      </div>
    </div>
  );
}

PuppyAddForm.propTypes = {
  onClickSaveHandler: PropTypes.func.isRequired
};

export default PuppyAddForm;
