import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import MapPage from './containers/MapPage';
import auth from './containers/Authorization/requireAuthentication';
import SignInPage from './pages/SignInPage/SignInPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.js';

export default (
  <Route path="(/:sidebar)" component={App}>
    <IndexRoute component={auth(MapPage, ['owner', 'user'])} />
    <Route path="sign-in" component={SignInPage} />
    <Route path="register(/:invitationToken)" component={RegistrationPage} />
    <Route path="register/invited/:invitationToken" component={RegistrationPage} />
  </Route>
);
