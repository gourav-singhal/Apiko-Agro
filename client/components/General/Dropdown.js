import React, { PropTypes } from 'react';
import { Form } from 'semantic-ui-react';

import inputContainer from '../../containers/General/Input';

const DropDownField = ({ inputState, handleInput, ...props }) => ( // eslint-disable-line
  <Form.Dropdown
    {...props}
    value={inputState.value || []}
    error={!inputState.isValid}
    onChange={handleInput}
  />
);

DropDownField.propTypes = {
  inputState: PropTypes.object,
  handelInput: PropTypes.func,
};

export default inputContainer(DropDownField);
