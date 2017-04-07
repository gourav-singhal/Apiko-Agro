import { unset, without } from 'lodash';

import {
  INIT_RENTERS,
  PUSH_RENTER,
  REMOVE_RENTER,
  UPDATE_RENTER,
} from './constants';

const renters = (state = { values: {}, keys: [] }, action) => {
  switch (action.type) {
    case INIT_RENTERS:
      return action.renters;
    case PUSH_RENTER: {
      const newRenter = action.renter;

      return {
        values: {
          ...state.values,
          [newRenter._id]: newRenter,
        },
        keys: [...state.keys, newRenter._id],
      };
    }
    case REMOVE_RENTER: {
      const renterId = action.renterId;
      const newValues = { ...state.values };
      unset(newValues, renterId);

      return {
        values: newValues,
        keys: without(state.keys, renterId),
      };
    }
    case UPDATE_RENTER: {
      const renterToUpdate = state.values[action.renter._id];

      const { values, keys } = state;
      const updatedRenter = { ...renterToUpdate, ...action.renter };

      return {
        values: {
          ...values,
          [updatedRenter._id]: updatedRenter,
        },
        keys,
      };
    }
    default:
      return state;
  }
};

export { renters };
