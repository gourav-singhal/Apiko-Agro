import { unset, without } from 'lodash';

import {
  INIT_CONTRACTS,
  PUSH_CONTRACT,
  UPDATE_CONTRACT,
  REMOVE_CONTRACT,
} from './constants';

const contracts = (state = { keys: [], values: {} }, action) => {
  switch (action.type) {
    case INIT_CONTRACTS: {
      return action.contracts;
    }
    case PUSH_CONTRACT: {
      const newContract = action.contract;


      return {
        values: {
          ...state.values,
          [newContract._id]: newContract,
        },
        keys: [...state.keys, newContract._id],
      };
    }
    case UPDATE_CONTRACT: {
      const contractToUpdate = state.values[action.contract._id];
      const { values, keys } = state;
      const updatedContract = { ...contractToUpdate, ...action.contract };

      return {
        values: {
          ...values,
          [updatedContract._id]: updatedContract,
        },
        keys,
      };
    }
    case REMOVE_CONTRACT: {
      const contractId = action.contractId;
      const newValues = { ...state.values };
      unset(newValues, contractId);

      return {
        values: newValues,
        keys: without(state.keys, contractId),
      };
    }
    default:
      return state;
  }
};

export { contracts };
