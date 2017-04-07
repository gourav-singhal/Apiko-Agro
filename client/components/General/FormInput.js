import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

import inputContainer from '../.././containers/General/Input';

const FormInput = ({ inputState, handelInput, changeInput, ...props }) => ( // eslint-disable-line
  <Form.Input
    {...props}
    value={inputState.value || ''}
    error={!inputState.isValid}
    onChange={handelInput}
  />
);

FormInput.propTypes = {
  inputState: PropTypes.object,
  handelInput: PropTypes.func,
};

export default inputContainer(FormInput);
