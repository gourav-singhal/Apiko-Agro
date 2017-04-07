import { INIT_POLYGONS, ACTIVATE_POLYGON } from './constants';
import { SET_ACTIVE_FIELD } from '../Fields/constants';
import { CHANGE_ACTIVE_LOCALITY } from '../Departments/constants';

const polygons = (state = { values: {}, keys: [] }, action) => {
  switch (action.type) {
    case INIT_POLYGONS:
      return action.polygons;

    case CHANGE_ACTIVE_LOCALITY:
      return { values: {}, keys: [] };

    default:
      return state;
  }
};

const activePolygon = (state = null, action) => {
  switch (action.type) {
    case ACTIVATE_POLYGON:
      return action.polygonId;

    case SET_ACTIVE_FIELD:
      return null;

    default:
      return state;
  }
};

export {
  polygons,
  activePolygon,
};
