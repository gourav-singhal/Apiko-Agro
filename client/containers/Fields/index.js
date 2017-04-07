import { connect } from 'react-redux';

import { compose, withHandlers, withState, lifecycle } from 'recompose';
import { setActiveField, updateField } from './actions';

import { getCoordsAndSquare, getCenterOfPolygon } from '../../utils/polygons';
import Fields from '../../components/Fields';

const enhance = compose(
  connect(
    state => {
      const localities = state.organization && state.organization.localities;
      const localityColors = {};
      if (localities) {
        localities.forEach(locality => {
          localityColors[locality.id] = locality.color;
        });
      }

      return {
        fields: state.fields,
        activeField: state.fields.values[state.activeField],
        localityId: state.activeLocality,
        fieldsFilter: state.fieldsFilter,
        polygons: state.polygons,
        sideBar: state.sideBar,
        isHighlightedLoc: state.map.isHighlightedLoc,
        isFieldsVisible: state.map.layers.isFields,
        localityColors,
      };
    }
  ),
  withState('infoWindowPosition', 'setInfoWindowPosition', {}),
  lifecycle({
    componentWillUpdate(nextProps) {
      if (
        !nextProps.localityId &&
        this.props.fields.keys.length !== nextProps.fields.keys.length
      ) {
        const fieldKeys = nextProps.fields.keys;
        const map = this.props.getMapInstance();
        const mapBounds = new window.google.maps.LatLngBounds();
        if (fieldKeys.length) {
          nextProps.fields.keys.forEach(key =>
            mapBounds.extend(nextProps.fields.values[key].coordinates[0]));
          map.fitBounds(mapBounds);
        }
      }
    },
  }),

  withHandlers({
    closeInfoWindow: ({ setInfoWindowPosition, dispatch }) => () => {
      setInfoWindowPosition({});
      dispatch(setActiveField(null));
    },

    getColorOfField: ({ localityColors, isHighlightedLoc }) => field => (
      isHighlightedLoc ? localityColors[field.localityId] : field.color
    ),

    isFieldActive: ({ fieldsFilter, fields }) => fieldId => {
      const localityId = fields.values[fieldId].localityId;
      return !!fieldsFilter[localityId];
    },

    onClickField: ({ dispatch, setInfoWindowPosition, fields }) => fieldId => {
      dispatch(setActiveField(fieldId));
      const centerOfPolygon = getCenterOfPolygon(fields.values[fieldId].coordinates);
      setInfoWindowPosition(centerOfPolygon);
    },

    // store new coords and square in redux
    onUpdateField: ({ dispatch, activeField }) => googlePolygon => {
      if (googlePolygon) {
        const updatedField = getCoordsAndSquare(googlePolygon);
        dispatch(updateField(updatedField, activeField._id));
      }
    },
  }),
);

export default enhance(Fields);
