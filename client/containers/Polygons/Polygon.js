import { compose, withHandlers, lifecycle } from 'recompose';
import _ from 'lodash';

import Polygon from '../../components/Polygons/Polygon';

const enhance = compose(
  lifecycle({
    shouldComponentUpdate(nextProps) {
      const { isActive, color, isFiltered } = this.props;
      if (nextProps.isActive) return true;
      if (nextProps.isFiltered !== isFiltered) return true;
      return nextProps.isActive !== isActive || nextProps.color !== color;
    },
  }),
  withHandlers({
    getPixelPositionOffset: () => (width, height) => ({ x: -(width / 2), y: -(height / 2) }),
    addGoogleListeners: ({ data: { _id }, isActive, onEditPolygon }) => polygonElem => {
      if (!isActive || !onEditPolygon) return;
      const polygon = polygonElem.getPath();
      window.google.maps.event.clearInstanceListeners(polygon);

      const addListener = window.google.maps.event.addListener;
      addListener(polygon, 'set_at', () => onEditPolygon(polygon, _id));
      addListener(polygon, 'insert_at', () => onEditPolygon(polygon, _id));
      addListener(polygon, 'remove_at', () => onEditPolygon(polygon, _id));
    },
    activateField: ({ isActive, onPolygonClick, data }) => () => {
      if (!isActive) {
        onPolygonClick(data._id);
      }
    },
    getOptions: ({ isActive, color, onEditPolygon, zIndex, isFiltered }) => () => {
      let fillOpacity = 0.2;
      const isFilterDisabled = _.isNull(isFiltered) || _.isUndefined(isFiltered);

      if (isActive) {
        fillOpacity += 0.3;
      }
      if (!isFilterDisabled) {
        fillOpacity += isFiltered ? 0.3 : -0.2;
      }

      return {
        fillOpacity,
        strokeOpacity: 0.5,
        strokeColor: color,
        strokeWeight: isActive ? 2 : 1,
        fillColor: color,
        editable: !!onEditPolygon && isActive,
        zIndex,
      };
    },
    getContentCoordinate: ({ data }) => () => {
      const bounds = new window.google.maps.LatLngBounds();
      data.coordinates.forEach(coordinate => bounds.extend(coordinate));
      return bounds.getCenter();
    },
  }),
);

export default enhance(Polygon);
