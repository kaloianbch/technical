import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//TODO- add Enzyme to check if <img> src works properly

it('connects to the REST API and receives data', () => {
  fetch('https://api.spacexdata.com/v3/launches')
      .then(response => {
        expect(response != null).toBeTruthy()
      })
});

