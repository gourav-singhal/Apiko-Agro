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

const setMapCenterFor = (coordinates, zoom) => ({
  coordinates,
  zoom,
  type: MAP_CENTER,
});

const mapLoading = isLoading => ({
  isLoading,
  type: MAP_LOADING,
});

const setMapType = mapType => ({
  mapType,
  type: MAP_TYPE,
});

const setDrawingMode = drawingMode => ({
  drawingMode,
  type: DRAWING_MODE,
});

const setHighlightLoc = isHighlightedLoc => ({
  isHighlightedLoc,
  type: HIGHLIGHT_LOCALITIES,
});

const toggleAreasLayer = isShown => ({
  isAreas: isShown,
  type: AREAS_LAYER,
});

const toggleFieldsLayer = isShown => ({
  isFields: isShown,
  type: FIELDS_LAYER,
});

const setMyAreasFilter = isMyAreas => ({
  isMyAreas,
  type: MY_AREAS_FILTER,
});

export {
  setMapCenterFor,
  mapLoading,
  setMapType,
  setDrawingMode,
  setHighlightLoc,
  toggleAreasLayer,
  toggleFieldsLayer,
  setMyAreasFilter,
};
