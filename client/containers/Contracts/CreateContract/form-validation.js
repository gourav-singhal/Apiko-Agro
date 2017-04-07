import { DEFAULT_FORM_STATE, getEmptyField } from '../../General/form-validation';

export default (formData, props) => {
  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  if (parseInt(formData.validity, 10) < 1 || parseInt(formData.validity, 10) > 100) {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning: { name: 'validity-range' } });
    return false;
  }
  return true;
};
