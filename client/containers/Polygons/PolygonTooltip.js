import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';

import PolygonTooltip from '../../components/Polygons/PolygonTooltip';
import { getCenterOfPolygon } from '../../utils/polygons';

const getAreaByPolygon = (areas, polygonId) => {
  const index = areas.keys.find(key => areas.values[key].polygonId === polygonId);

  return index && areas.values[index];
};

const getLandlords = (landlords, areas, activePolygon) => {
  const area = getAreaByPolygon(areas, activePolygon);

  return area && area.landlordIds.map(id => landlords.values[id]);
};

const enhance = compose(
  connect(
    ({ polygons, activePolygon, landlords, areas }) => ({
      polygon: polygons.values[activePolygon] || {},
      activePolygon,
      landlords: getLandlords(landlords, areas, activePolygon),
      area: getAreaByPolygon(areas, activePolygon),
    }),
  ),
  withState('infoWindowPosition', 'setInfoWindPosition', null),
  lifecycle({
    componentWillUpdate({ polygon }) {
      // if choosen other polygon
      if (polygon._id && polygon._id !== this.props.polygon._id) {
        const polygonCenter = getCenterOfPolygon(polygon.coordinates);
        this.props.setInfoWindPosition(polygonCenter);
      }
    },
  }),
);

export default enhance(PolygonTooltip);
