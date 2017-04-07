import { SORT, FILTER, SEARCH } from './contants';

const search = (inModel, value) => ({
  type: SEARCH,
  inModel,
  value,
});

const filter = (inModel, filters) => ({
  type: FILTER,
  inModel,
  filters,
});

const sort = (inModel, sortBy) => ({
  type: SORT,
  inModel,
  sortBy,
});

export { search, filter, sort };
