import React, { PropTypes } from 'react';
import { Label } from 'semantic-ui-react';
import Visible from '../General/Visible';
import { I18n } from 'react-i18nify';

/**
 Provide form warning label for form field
 @example
       <Form.Field>
         <label>...</label>
         <Dropdown ... />
         <FormWarning isVisible={isShow === true} message={I18n.t('special-message')} >
       </Form.Field>
 **/
const FormWarning = ({ isVisible, message }) => (
  <Visible
    isVisible={isVisible}
  >
    <Label basic color="orange" pointing>
      {message || I18n.t('field-required')}
    </Label>
  </Visible>
);

FormWarning.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string,
};
export default FormWarning;
