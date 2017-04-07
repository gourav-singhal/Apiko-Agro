import {
  INIT_RENTERS,
  PUSH_RENTER,
  REMOVE_RENTER,
  UPDATE_RENTER,
} from './constants';
import normalizeData from '../../utils/data/data_normalizator';

const initRenters = renters => ({
  type: INIT_RENTERS,
  renters: normalizeData('_id', renters),
});

const pushRenter = renter => ({
  type: PUSH_RENTER,
  renter,
});

const removeRenter = renterId => ({
  type: REMOVE_RENTER,
  renterId,
});

const updateRenter = renter => ({
  type: UPDATE_RENTER,
  renter,
});

export {
  initRenters,
  pushRenter,
  removeRenter,
  updateRenter,
};
