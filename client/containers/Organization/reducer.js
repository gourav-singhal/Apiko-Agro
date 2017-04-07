import {
  INIT_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from './constants.js';

const organization = (state = null, action) => {
  switch (action.type) {
    case CREATE_ORGANIZATION:
    case INIT_ORGANIZATION:
      return action.organization;

    case UPDATE_ORGANIZATION:
      return { ...state, ...action.organization };

    default:
      return state;
  }
};

export {
  organization,
};
