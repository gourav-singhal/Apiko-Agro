import {
  INIT_LANDLORDS,
  ADD_LANDLORD,
  UPDATE_LANDLORD,
  REMOVE_LANDLORD,
} from './constants';

import normalizeData from '../../utils/data/data_normalizator';

const initLandlords = landlords => ({
  type: INIT_LANDLORDS,
  landlords: normalizeData('_id', landlords),
});

const addLandlord = landlord => ({
  type: ADD_LANDLORD,
  landlord,
});

const updateLandlord = (landlord, landlordId) => ({
  type: UPDATE_LANDLORD,
  landlord,
  landlordId,
});

const removeLandlord = landlordId => ({
  type: REMOVE_LANDLORD,
  landlordId,
});

export {
  initLandlords,
  addLandlord,
  updateLandlord,
  removeLandlord,
};
