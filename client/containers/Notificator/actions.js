import { HIDE_MESSAGE, SHOW_SUCCESS, SHOW_ERROR } from './constants';

const hideMessage = () => ({
  type: HIDE_MESSAGE,
});

const showSuccess = (title, text) => ({
  type: SHOW_SUCCESS,
  title,
  text,
});

const showError = (title, text) => ({
  type: SHOW_ERROR,
  title,
  text,
});

export {
  hideMessage,
  showSuccess,
  showError,
};
