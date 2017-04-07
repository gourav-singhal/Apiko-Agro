import { SORT, FILTER, SEARCH } from './contants';

const DEFAULT_ACTIONS = {
  search: {},
  filter: {},
  sort: {},
};

export default (state = DEFAULT_ACTIONS, action) => {
  switch (action.type) {
    case SEARCH: {
      const { inModel, value } = action;
      return { ...state, search: { inModel, value } };
    }
    case SORT: {
      const { inModel, sortBy } = action;
      return { ...state, sort: { inModel, sortBy } };
    }
    case FILTER: {
      const { inModel, filters } = action;
      return { ...state, filter: { inModel, filters } };
    }

    default:
      return state;
  }
};
