import React, { PropTypes } from 'react';
import routes from '../../routes';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import '../../styles/main.scss';

const Root = ({ store, history }) =>
  <Provider store={store}>
    <Router history={Object.assign(history, store)} routes={routes} />
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default Root;
