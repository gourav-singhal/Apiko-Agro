import { unset, without } from 'lodash';

import {
  INIT_FIELDS,
  SET_ACTIVE_FIELD,
  ADD_FIELD,
  UPDATE_FIELD,
  REMOVE_FIELD,
  SET_FIELD_TO_EDIT,
} from './constants';
import { ACTIVATE_POLYGON } from '../Polygons/constants';
import { CLOSE_SIDE_BAR } from '../SideBar/constants';

const fields = (state = { keys: [], values: {} }, action) => {
  switch (action.type) {
    case INIT_FIELDS:
      return action.fields;
    case ADD_FIELD: {
      const newField = action.field;

      return {
        values: {
          ...state.values,
          [newField._id]: newField,
        },
        keys: [...state.keys, newField._id],
      };
    }

    case REMOVE_FIELD: {
      const fieldId = action.fieldId;
      const newValues = { ...state.values };
      unset(newValues, fieldId);

      return {
        values: newValues,
        keys: without(state.keys, fieldId),
      };
    }

    case UPDATE_FIELD: {
      const fieldToUpdate = state.values[action.fieldId];

      const { values, keys } = state;
      const updatedField = Object.assign(fieldToUpdate, action.field);

      return {
        values: {
          ...values,
          [updatedField._id]: updatedField,
        },
        keys,
      };
    }
    default:
      return state;
  }
};

const activeField = (state = null, action) => {
  switch (action.type) {
    case SET_ACTIVE_FIELD:
      return action.fieldId;
    case ACTIVATE_POLYGON:
      return null;
    default:
      return state;
  }
};

const fieldToEdit = (state = null, action) => {
  switch (action.type) {
    case SET_FIELD_TO_EDIT:
      return action.field;
    case CLOSE_SIDE_BAR:
      return null;
    default:
      return state;
  }
};

export {
  fields,
  activeField,
  fieldToEdit,
};
