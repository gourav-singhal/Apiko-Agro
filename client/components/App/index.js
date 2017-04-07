import React, { PropTypes } from 'react';
import Notificator from '../../containers/Notificator';

const App = ({ children }) =>
  <div>
    {children}
    <Notificator />
  </div>;

App.propTypes = {
  children: PropTypes.object,
};

export default App;
