import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import App from './App';
import Filters from './Filters';
import PuppyAddForm from './PuppyAddForm';
import PuppiesList from './PuppiesList';
import Puppy from './Puppy';

describe('All tests', () => {
  describe('App component related tests', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve([])
        })
      );
    });

    it('Renders without crashing', () => {
      const div = document.createElement('div');

      ReactDOM.render(<App />, div);
    });

    it('Renders App without crashing', () => {
      shallow(<App />);
    });

    it('Changes state effectively as server response comes back', done => {
      // Overwriting with custom response
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                id: 1,
                name: 'Beast',
                type: 'Terrier'
              }
            ])
        })
      );

      const app = mount(<App />);

      expect(app.state().puppies).toEqual([]);
      setTimeout(() => {
        expect(app.state().puppies).toEqual([
          {
            id: 1,
            name: 'Beast',
            type: 'Terrier'
          }
        ]);
        done();
      }, 0);
    });
  });

  it('Renders Filters without crashing', () => {
    const props = {
      currentFilter: 'ALL',
      onChangeFilterHandler: () => {}
    };

    shallow(<Filters {...props} />);
  });

  it('Renders PuppyAddForm without crashing', () => {
    const props = { onClickSaveHandler: () => {} };

    shallow(<PuppyAddForm {...props} />);
  });

  it('Renders PuppiesList without crashing', () => {
    const props = {
      puppies: [],
      onClickAdoptHandler: () => {},
      onClickDeleteHandler: () => {}
    };

    shallow(<PuppiesList {...props} />);
  });

  describe('Puppy component test suite', () => {
    let props;
    let mountedPuppy;
    const puppy = () => {
      if (!mountedPuppy) {
        mountedPuppy = mount(<Puppy {...props} />);
      }
      return mountedPuppy;
    };

    beforeEach(() => {
      props = {
        id: 1,
        onClickAdoptHandler: jest.fn(),
        onClickDeleteHandler: jest.fn()
      };
      mountedPuppy = undefined;
    });

    it('Renders Puppy without crashing', () => {
      shallow(<Puppy {...props} />);
    });

    it('Renders correctly when passed in prop `adopted` is true', () => {
      props = Object.assign({}, props, {
        name: 'Beast',
        type: 'Chihuahua',
        adopted: true
      });

      const paragraphs = puppy()
        .find('div')
        .first()
        .props().children;

      expect(paragraphs[0].props.children.join('')).toEqual('Name: Beast');
      expect(paragraphs[1].props.children.join('')).toEqual('Type: Chihuahua');
      expect(paragraphs[2].props.children.join('')).toEqual('Adopted: True');

      const btn = puppy()
        .find('div')
        .last()
        .find('button')
        .first()
        .props();

      expect(btn.className.indexOf('adopted')).not.toBe(-1);
      expect(btn.children).toEqual('Cancel Adoption');
    });

    it('Correctly calls `onClickAdoptHandler` from `prop` when clicking the `Adopt/Cancel Adoption` button', () => {
      const btn = puppy()
        .find('div')
        .last()
        .find('button')
        .first();

      expect(props.onClickAdoptHandler).not.toHaveBeenCalled();
      btn.simulate('click');
      expect(props.onClickAdoptHandler).toHaveBeenCalledTimes(1);
    });
  });
});
