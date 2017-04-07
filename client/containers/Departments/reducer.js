import { unset, without } from 'lodash';

import {
  INIT_DEPARTMENTS,
  PUSH_DEPARTMENT,
  REMOVE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  INIT_LOCALITIES,
  CHANGE_ACTIVE_LOCALITY,
} from './constants';

const departments = (state = {}, action) => {
  switch (action.type) {
    case INIT_DEPARTMENTS:
      return action.departments;
    case PUSH_DEPARTMENT: {
      const newDep = action.department;

      return {
        values: {
          ...state.values,
          [newDep._id]: newDep,
        },
        keys: [...state.keys, newDep._id],
      };
    }
    case REMOVE_DEPARTMENT: {
      const depId = action.departmentId;
      const newValues = { ...state.values };
      unset(newValues, depId);

      return {
        values: newValues,
        keys: without(state.keys, depId),
      };
    }
    case UPDATE_DEPARTMENT: {
      const depToUpdate = state.values[action.department._id];

      const { values, keys } = state;
      const updatedDep = Object.assign(depToUpdate, action.department);

      return {
        values: {
          ...values,
          [updatedDep._id]: updatedDep,
        },
        keys,
      };
    }
    default:
      return state;
  }
};

const localities = (state = [], action) => {
  switch (action.type) {
    case INIT_LOCALITIES:
      return action.localities;
    default:
      return state;
  }
};

const activeLocality = (state = null, { type, localityId }) => {
  switch (type) {
    case CHANGE_ACTIVE_LOCALITY:
      return localityId;
    default:
      return state;
  }
};

export {
  departments,
  localities,
  activeLocality,
};
