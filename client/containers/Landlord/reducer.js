import { unset, without } from 'lodash';

import {
  INIT_LANDLORDS,
  ADD_LANDLORD,
  UPDATE_LANDLORD,
  REMOVE_LANDLORD,
} from './constants';

const landlords = (state = { keys: [], values: {} }, action) => {
  switch (action.type) {
    case INIT_LANDLORDS:
      return action.landlords;

    case ADD_LANDLORD: {
      const newDep = action.landlord;

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

    case UPDATE_LANDLORD: {
      const depToUpdate = state.values[action.landlordId];
      const { values, keys } = state;
      const updatedDep = Object.assign(depToUpdate, action.landlord);

      return {
        values: {
          ...values,
          [updatedDep._id]: updatedDep,
        },
        keys,
      };
    }

    case REMOVE_LANDLORD: {
      const depId = action.landlordId;
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
  landlords,
};
