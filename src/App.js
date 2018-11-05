import React, { useState, useEffect, lazy, Suspense } from 'react';
import './App.css';

const API_SERVER = 'http://localhost:4000';

const LazyFilters = lazy(() => import('./Filters'));
const LazyPuppyAddForm = lazy(() => import('./PuppyAddForm'));
const LazyPuppiesList = lazy(() => import('./PuppiesList'));

const determineFilteredPuppies = (puppiesArr, filter) => {
  let filteredPuppies = [];

  switch (filter) {
    case 'ALL':
      filteredPuppies = puppiesArr.slice(0);
      break;
    case 'ADOPTED':
      filteredPuppies = puppiesArr.filter(puppy => puppy.adopted);
      break;
    case 'NOT_ADOPTED':
      filteredPuppies = puppiesArr.filter(puppy => !puppy.adopted);
      break;
    default:
      filteredPuppies = puppiesArr.slice(0);
      break;
  }

  return filteredPuppies;
};

const App = () => {
  const [isInAddMode, setIsInAddMode] = useState(false);
  const [puppies, setPuppies] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const onClickSaveHandler = async puppy => {
    await fetch(`${API_SERVER}/puppies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    });
    const res = await fetch(`${API_SERVER}/puppies`);
    const json = await res.json();

    setPuppies(json);
    setIsInAddMode(false);
  };

  const onClickAdoptHandler = async puppyId => {
    const puppy = puppies.find(puppy => puppy.id === puppyId);
    puppy.adopted = !puppy.adopted;

    await fetch(`${API_SERVER}/puppies/${puppyId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    });
    const res = await fetch(`${API_SERVER}/puppies`);
    const json = await res.json();

    setPuppies(json);
  };

  const onClickDeleteHandler = async puppyId => {
    await fetch(`${API_SERVER}/puppies/${puppyId}`, { method: 'DELETE' });
    const res = await fetch(`/puppies`);
    const json = await res.json();

    setPuppies(json);
  };

  useEffect(async () => {
    const res = await fetch(`${API_SERVER}/puppies`);
    const json = await res.json();
    setPuppies(json);
  }, []);

  if (!puppies.length) {
    return null;
  }

  return (
    <div className="puppies-app u-pa-double">
      <header className="puppies-app__header u-fx u-fx-align-center u-fx-justify-center u-mb-double">
        <h2>Puppy Adoption FTW</h2>
      </header>
      <div className="u-fx u-fx-align-center u-fx-justify-center  u-mb-double">
        <Suspense fallback={null}>
          <LazyFilters
            filter={filter}
            onChangeFilterHandler={e => setFilter(e.target.value)}
          />
        </Suspense>
        <span className="u-mh-double">OR</span>
        <button
          className="puppy-add-btn u-pa-half"
          onClick={_ => setIsInAddMode(!isInAddMode)}
        >
          Toggle add puppy form
        </button>
      </div>
      {isInAddMode ? (
        <Suspense fallback={null}>
          <LazyPuppyAddForm onClickSaveHandler={onClickSaveHandler} />
        </Suspense>
      ) : null}
      <Suspense fallback={null}>
        <LazyPuppiesList
          onClickAdoptHandler={onClickAdoptHandler}
          onClickDeleteHandler={onClickDeleteHandler}
          puppies={determineFilteredPuppies(puppies, filter)}
        />
      </Suspense>
    </div>
  );
};

export default React.memo(App);
