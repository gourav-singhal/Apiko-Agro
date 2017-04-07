import { TOGGLE_FIELDS_FILTER, INIT_FIELDS_FILTER } from './constants';

const toggleFieldsFilter = (localityId, isShown) => ({
  type: TOGGLE_FIELDS_FILTER,
  localityId,
  isShown,
});

const initFieldsFilter = fieldsFilter => ({
  type: INIT_FIELDS_FILTER,
  fieldsFilter,
});

export { initFieldsFilter, toggleFieldsFilter };
