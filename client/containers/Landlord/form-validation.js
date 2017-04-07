import { DEFAULT_FORM_STATE, getEmptyField } from '../General/form-validation';
import { I18n } from 'react-i18nify';

export default (formData, props) => {
  const emptyValueName = getEmptyField(formData, ['comment', 'file']);
  if (emptyValueName) {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  const passportValidationExp = /[А-Я]{2}\d{6}/i;
  const personalIdValidationExp = /^\d{10}$/;
  const phoneNumberExp = /^([+]?[0-9\s-\(\)]{10,16})*$/i;

  if (!passportValidationExp.test(formData.passportDetails)) {
    props.setFormState({ ...DEFAULT_FORM_STATE, error: I18n.t('invalid_passport_data') });
    return false;
  }

  if (!personalIdValidationExp.test(formData.personalId)) {
    props.setFormState({ ...DEFAULT_FORM_STATE, error: I18n.t('invalid_personal_number') });
    return false;
  }

  if (!phoneNumberExp.test(formData.phoneNumber)) {
    props.setFormState({ ...DEFAULT_FORM_STATE, error: I18n.t('invalid_phone_number') });
    return false;
  }
  return true;
};
