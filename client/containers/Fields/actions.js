import {
  INIT_FIELDS,
  SET_ACTIVE_FIELD,
  ADD_FIELD,
  UPDATE_FIELD,
  REMOVE_FIELD,
  SET_FIELD_TO_EDIT,
} from './constants';

import normalizeData from '../../utils/data/data_normalizator';

const initFields = fields => ({
  type: INIT_FIELDS,
  fields: normalizeData('_id', fields),
});

const setActiveField = fieldId => ({
  type: SET_ACTIVE_FIELD,
  fieldId,
});

const addField = field => ({
  type: ADD_FIELD,
  field,
});

const updateField = (field, fieldId) => ({
  type: UPDATE_FIELD,
  field,
  fieldId,
});

const removeField = fieldId => ({
  type: REMOVE_FIELD,
  fieldId,
});

const setFieldToEdit = field => ({
  type: SET_FIELD_TO_EDIT,
  field,
});

export {
  setFieldToEdit,
  initFields,
  setActiveField,
  addField,
  updateField,
  removeField,
};
