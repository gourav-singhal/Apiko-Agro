import {
  HIDE_MESSAGE,
  SHOW_SUCCESS,
  SHOW_ERROR,
} from './constants.js';

const appMessage = (state = null, action) => {
  switch (action.type) {
    case SHOW_SUCCESS:
      return {
        title: action.title,
        text: action.text,
        type: 'success',
        isShown: true,
      };

    case SHOW_ERROR:
      return {
        title: action.title,
        text: action.text,
        type: 'error',
        isShown: true,
      };

    case HIDE_MESSAGE:
      return { ...state, isShown: false };

    default:
      return state;
  }
};

export {
  appMessage,
};
