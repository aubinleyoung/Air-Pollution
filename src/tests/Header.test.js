/* eslint-disable comma-dangle */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render, screen, cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import store from '../redux/configureStore';
import Header from '../components/header/Header';
import '@testing-library/jest-dom';

afterEach(cleanup);
describe('Header component test', () => {
  test('Render test', () => {
    render(
      <Router>
        <Provider store={store}>
          <Header />
        </Provider>
      </Router>
    );
    const headerElement = screen.getByTestId('year');

    expect(headerElement).toHaveTextContent('2023');
  });

  test('Header SnapShot', () => {
    const tree = renderer
      .create(
        <Router>
          <Provider store={store}>
            <Header />
          </Provider>
        </Router>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
