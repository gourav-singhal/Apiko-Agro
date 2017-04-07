import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import {
  setMapType,
  setDrawingMode,
  setHighlightLoc,
  toggleAreasLayer,
  toggleFieldsLayer,
  setMyAreasFilter,
} from './actions';

import MapToolBar from '../../components/Map/MapToolBar';

const enhance = compose(
  connect(
    state => ({
      mapType: state.map.type,
      drawingMode: state.map.drawingMode,
      isHighlightedLoc: state.map.isHighlightedLoc,
      layers: state.map.layers,
      myAreasFilter: state.areasFilter.isMyAreas,
    })
  ),
  withHandlers({
    setMapType: ({ dispatch }) => type => dispatch(setMapType(type)),
    setDrawingMode: ({ dispatch }) => mode => dispatch(setDrawingMode(mode)),
    setAreasFilter: ({ dispatch }) => (e, { checked }) => dispatch(toggleAreasLayer(checked)),
    setFieldsFilter: ({ dispatch }) => (e, { checked }) => dispatch(toggleFieldsLayer(checked)),
    toggleHighlightLoc: ({ dispatch, isHighlightedLoc }) => () =>
      dispatch(setHighlightLoc(!isHighlightedLoc)),
    toggleMyAreasFilter: ({ dispatch, myAreasFilter }) => () =>
      dispatch(setMyAreasFilter(!myAreasFilter)),
  })
);

export default enhance(MapToolBar);
