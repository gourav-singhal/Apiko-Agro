import React, { PropTypes } from 'react';
import { Input } from 'semantic-ui-react';

import inputContainer from '../.././containers/General/Input';

const ReactiveInput = ({ inputState, handelInput, changeInput, ...props }) => ( // eslint-disable-line
  <Input
    {...props}
    value={inputState.value || ''}
    error={!inputState.isValid}
    onChange={handelInput}
  />
);

ReactiveInput.propTypes = {
  inputState: PropTypes.object,
  handelInput: PropTypes.func,
};

export default inputContainer(ReactiveInput);
