import _ from 'lodash';

const DEFAULT_FORM_STATE = {
  loading: false,
  error: false,
  warning: {},
};

const getEmptyField = (formData, except) => {
  const emptyValueName = Object.keys(formData).find(key => {
    if (key.includes('search')) {
      return false;
    }
    if (except && except.includes(key)) {
      return false;
    }
    if (formData[key] === undefined) {
      return true;
    }
    if (_.isString(formData[key]) && !formData[key].trim()) {
      return true;
    }
    if (_.isArray(formData[key]) && formData[key][0] === undefined) {
      return true;
    }
    return false;
  });

  return emptyValueName;
};

const isEmailValid = (email) => {
  /* eslint-disable */
  const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  return regExp.test(email);
};

export {
  getEmptyField,
  isEmailValid,
  DEFAULT_FORM_STATE,
};
