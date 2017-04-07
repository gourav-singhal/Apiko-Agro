import {
  INIT_CONTRACTS,
  PUSH_CONTRACT,
  UPDATE_CONTRACT,
  REMOVE_CONTRACT,
} from './constants';
import normalizeData from '../../../utils/data/data_normalizator';

const initContracts = contracts => ({
  type: INIT_CONTRACTS,
  contracts: normalizeData('_id', contracts),
});

const pushContract = contract => ({
  type: PUSH_CONTRACT,
  contract,
});

const updateContract = contract => ({
  type: UPDATE_CONTRACT,
  contract,
});

const removeContract = contractId => ({
  type: REMOVE_CONTRACT,
  contractId,
});

export {
  initContracts,
  pushContract,
  updateContract,
  removeContract,
};
