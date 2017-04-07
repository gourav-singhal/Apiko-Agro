import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

/**
 Provide spinner
 @example
        <Spinner />

 **/

const Spinner = () => (
  <Dimmer active inverted>
    <Loader><Translate value="loading" />...</Loader>
  </Dimmer>
);

export default Spinner;
