import {
  INIT_AREAS,
  ADD_AREA,
  UPDATE_AREA,
  REMOVE_AREA,
} from './constants';

import normalizeData from '../../utils/data/data_normalizator';

const initAreas = areas => ({
  type: INIT_AREAS,
  areas: normalizeData('_id', areas),
});

const addArea = area => ({
  type: ADD_AREA,
  area,
});

const updateArea = (area, areaId) => ({
  type: UPDATE_AREA,
  area,
  areaId,
});

const removeArea = areaId => ({
  type: REMOVE_AREA,
  areaId,
});

export {
  initAreas,
  addArea,
  updateArea,
  removeArea,
};
