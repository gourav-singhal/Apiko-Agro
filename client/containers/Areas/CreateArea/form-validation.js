import _ from 'lodash';

const DEFAULT_FORM_STATE = {
  loading: false,
  error: false,
  warning: {},
};

const isFormValid = (formData, props) => {
  const emptyValueName = Object.keys(_.omit(formData, [
    'square', 'file', 'comment',
  ])).find(key => !key.includes('search') && (!formData[key] || !formData[key][0]));

  if (emptyValueName) {
    props.setFormState({
      ...DEFAULT_FORM_STATE,
      warning: { name: emptyValueName },
    });
    return false;
  }
  return true;
};

export { DEFAULT_FORM_STATE, isFormValid };
