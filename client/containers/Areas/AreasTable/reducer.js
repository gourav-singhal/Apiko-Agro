import {
  INIT_AREAS,
} from './constants';

const areas = (state = { keys: [], values: {} }, action) => {
  switch (action.type) {
    case INIT_AREAS: {
      return action.areas;
    }
    default:
      return state;
  }
};

export { areas };
