import { unset, without } from 'lodash';

import {
  INIT_AREAS,
  ADD_AREA,
  UPDATE_AREA,
  REMOVE_AREA,
} from './constants';

const areas = (state = { keys: [], values: {} }, action) => {
  switch (action.type) {
    case INIT_AREAS:
      return action.areas;

    case ADD_AREA: {
      const newDep = action.area;

      const depExists = state.values[newDep._id];
      if (depExists) {
        return state;
      }

      return {
        values: {
          ...state.values,
          [newDep._id]: newDep,
        },
        keys: [...state.keys, newDep._id],
      };
    }

    case UPDATE_AREA: {
      const depToUpdate = state.values[action.areaId];

      const { values, keys } = state;
      const updatedDep = Object.assign(depToUpdate, action.area);

      return {
        values: {
          ...values,
          [updatedDep._id]: updatedDep,
        },
        keys,
      };
    }

    case REMOVE_AREA: {
      const depId = action.areaId;
      const newValues = { ...state.values };
      unset(newValues, depId);

      return {
        values: newValues,
        keys: without(state.keys, depId),
      };
    }

    default:
      return state;
  }
};

export {
  areas,
};
