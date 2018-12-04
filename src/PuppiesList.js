import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';

const LazyPuppy = lazy(() => import('./Puppy'));

const PuppiesList = ({
  puppies,
  onClickAdoptHandler,
  onClickDeleteHandler
}) => (
  <ul className="puppies-list u-fx">
    {puppies.map(puppy => (
      <Suspense key={puppy.id} fallback={null}>
        <LazyPuppy
          {...puppy}
          onClickAdoptHandler={onClickAdoptHandler}
          onClickDeleteHandler={onClickDeleteHandler}
        />
      </Suspense>
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
