import { TOGGLE_FIELDS_FILTER, INIT_FIELDS_FILTER } from './constants';

const fieldsFilter = (state = {}, action) => {
  switch (action.type) {
    case INIT_FIELDS_FILTER:
      return action.fieldsFilter;
    case TOGGLE_FIELDS_FILTER:
      return { ...state, [action.localityId]: action.isShown };
    default:
      return state;
  }
};

export { fieldsFilter };
