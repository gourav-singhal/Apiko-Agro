import {
  INIT_AREAS,
} from './constants';
import normalizeData from '../../../utils/data/data_normalizator';

const initAreas = areas => ({
  type: INIT_AREAS,
  areas: normalizeData('_id', areas),
});

export {
  initAreas,
};
