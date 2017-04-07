import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Map from '../../components/Map';

const enhance = compose(
  connect(
    state => ({
      center: state.map.coordinates,
      zoom: state.map.zoom,
      mapType: state.map.type,
      isLoading: state.map.loading,
    })
  ),
  withHandlers({
    setCenter: ({ center, zoom }) => () => center && zoom && {
      center,
      zoom,
    } || null,
  })
);

export default enhance(Map);
