import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';
import { initPolygon, activatePolygon } from './actions';
import { mapLoading } from '../Map/actions';
import { get, APIAddresses } from '../../utils/api';
import { showError } from '../Notificator/actions';
import _ from 'lodash';

import Polygons from '../../components/Polygons';

const enhance = compose(
  connect(
    ({
      polygons,
      activePolygon,
      activeLocality,
      areasFilter,
      areas,
      map,
    }) => {
      const myPolygons = areasFilter.isMyAreas && _.map(areas.values, area => area.polygonId);

      return {
        myPolygons,
        polygons,
        activePolygon,
        activeLocality,
        isAreasVisible: map.layers.isAreas,
      };
    },
  ),
  lifecycle({
    // when active locality changes
    componentWillReceiveProps({ activeLocality, dispatch }) {
      if (activeLocality && activeLocality !== this.props.activeLocality) {
        dispatch(mapLoading(true));
        dispatch(initPolygon([]));
        get(`${APIAddresses.POLYGONS}/${activeLocality}`)
          .then(response => {
            dispatch(initPolygon(response.data.polygons.sort(polygon => polygon.cadastralNumber)));
            dispatch(mapLoading(false));
          })
          .catch(err => {
            dispatch(showError('error', err.response.statusText));
          });
      }
    },
  }),
  withHandlers({
    onClickArea: ({ dispatch }) => polygonId => dispatch(activatePolygon(polygonId)),
    checkMyArea: ({ myPolygons }) => polygonId => (
      myPolygons ? myPolygons.includes(polygonId) : null
    ),
  })
);

export default enhance(Polygons);
