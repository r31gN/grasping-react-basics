import React, { Component } from 'react';
import Filters from './Filters';
import PuppyAddForm from './PuppyAddForm';
import PuppiesList from './PuppiesList';
import './App.css';

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

class App extends Component {
  constructor() {
    super();

    this.state = {
      isInAddMode: false,
      puppies: [],
      filter: 'ALL'
    };
  }

  componentDidMount = () =>
    fetch(`/puppies`)
      .then(res => res.json())
      .then(puppies => this.setState({ puppies }));

  _onChangeFilterHandler = e => {
    const filter = e.target.value;
    this.setState({ filter });
  };

  _onClickAddHandler = () =>
    this.setState(prevState => ({
      ...prevState,
      isInAddMode: !prevState.isInAddMode
    }));

  _onClickSaveHandler = puppy => {
    fetch(`/puppies`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    })
      .then(() => fetch(`/puppies`))
      .then(res => res.json())
      .then(puppies => this.setState({ puppies, isInAddMode: false }));
  };

  _onClickAdoptHandler = puppyId => {
    const puppy = this.state.puppies.find(puppy => puppy.id === puppyId);
    puppy.adopted = !puppy.adopted;

    fetch(`/puppies/${puppyId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(puppy)
    })
      .then(_ => fetch(`/puppies`))
      .then(res => res.json())
      .then(puppies => this.setState({ puppies }));
  };

  _onClickDeleteHandler = puppyId => {
    fetch(`/puppies/${puppyId}`, { method: 'DELETE' })
      .then(() => fetch(`/puppies`))
      .then(res => res.json())
      .then(puppies => this.setState({ puppies }));
  };

  render() {
    const { isInAddMode, puppies, filter } = this.state;

    if (!puppies.length) {
      return null;
    }

    return (
      <div className="puppies-app u-pa-double">
        <header className="puppies-app__header u-fx u-fx-align-center u-fx-justify-center u-mb-double">
          <h2>Puppy Adoption FTW</h2>
        </header>
        <div className="u-fx u-fx-align-center u-fx-justify-center  u-mb-double">
          <Filters
            filter={filter}
            onChangeFilterHandler={this._onChangeFilterHandler}
          />
          <span className="u-mh-double">OR</span>
          <button
            className="puppy-add-btn u-pa-half"
            onClick={this._onClickAddHandler}
          >
            Toggle add puppy form
          </button>
        </div>
        {isInAddMode ? (
          <PuppyAddForm onClickSaveHandler={this._onClickSaveHandler} />
        ) : null}
        <PuppiesList
          onClickAdoptHandler={this._onClickAdoptHandler}
          onClickDeleteHandler={this._onClickDeleteHandler}
          puppies={determineFilteredPuppies(puppies, filter)}
        />
      </div>
    );
  }
}

export default App;
