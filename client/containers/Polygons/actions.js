import { ACTIVATE_POLYGON, INIT_POLYGONS } from './constants';
import normalizeData from '../../utils/data/data_normalizator';

const initPolygon = polygons => ({
  type: INIT_POLYGONS,
  polygons: normalizeData('_id', polygons),
});

const activatePolygon = polygonId => ({
  type: ACTIVATE_POLYGON,
  polygonId,
});

export {
  initPolygon,
  activatePolygon,
};
