import {
  MAP_CENTER,
  MAP_LOADING,
  MAP_TYPE,
  DRAWING_MODE,
  HIGHLIGHT_LOCALITIES,
  AREAS_LAYER,
  FIELDS_LAYER,
  MY_AREAS_FILTER,
} from './constants';

const defaultMapState = {
  type: 'terrain',
  drawingMode: null,
  isHighlightedLoc: true,
  loading: false,
  layers: {
    isAreas: true,
    isFields: true,
  },
};

const defaultAreasFilterState = {
  isMyAreas: false,
};

const map = (state = defaultMapState, {
  type,
  coordinates,
  zoom,
  isLoading,
  mapType,
  drawingMode,
  isHighlightedLoc,
  isAreas,
  isFields,
}) => {
  switch (type) {
    case MAP_CENTER: {
      return { ...state, coordinates, zoom };
    }
    case MAP_LOADING: {
      return { ...state, loading: isLoading };
    }
    case MAP_TYPE: {
      return { ...state, type: mapType };
    }
    case DRAWING_MODE: {
      return { ...state, drawingMode };
    }
    case HIGHLIGHT_LOCALITIES: {
      return { ...state, isHighlightedLoc };
    }
    case AREAS_LAYER: {
      return { ...state, layers: { ...state.layers, isAreas } };
    }
    case FIELDS_LAYER: {
      return { ...state, layers: { ...state.layers, isFields } };
    }
    default:
      return state;
  }
};

const areasFilter = (state = defaultAreasFilterState, { type, isMyAreas }) => {
  switch (type) {
    case MY_AREAS_FILTER:
      return { ...state, isMyAreas };
    default:
      return state;
  }
};

export {
  map,
  areasFilter,
};
