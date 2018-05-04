import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Puppy from './Puppy';

class PuppiesList extends PureComponent {
  render = () => (
    <ul className="puppies-list u-fx u-fx-space-between">
      {this.props.puppies.map(puppy => (
        <Puppy
          key={puppy.id}
          {...puppy}
          onClickAdoptHandler={this.props.onClickAdoptHandler}
          onClickDeleteHandler={this.props.onClickDeleteHandler}
        />
      ))}
    </ul>
  );
}

// const PuppiesList = ({ puppies, onClickAdoptHandler, onClickDeleteHandler }) =>
//   puppies.map(puppy => (
//     <Puppy
//       key={puppy.id}
//       {...puppy}
//       onClickAdoptHandler={onClickAdoptHandler}
//       onClickDeleteHandler={onClickDeleteHandler}
//     />
//   ));

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

export default PuppiesList;
