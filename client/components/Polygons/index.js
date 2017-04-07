import React, { PropTypes } from 'react';
import Polygon from '../../containers/Polygons/Polygon';
import Visible from '../General/Visible';
import PolygonTooltip from '../../containers/Polygons/PolygonTooltip';

const Areas = ({
  polygons,
  activePolygon,
  onClickArea,
  isAreasVisible,
  checkMyArea,
}) => (
  <Visible isVisible={isAreasVisible}>
    <div>
      <PolygonTooltip />
      {polygons.keys.map(key => (
        <Polygon
          key={`area-${polygons.values[key]._id}`}
          zIndex={2}
          isFiltered={checkMyArea(polygons.values[key]._id)}
          data={polygons.values[key]}
          isActive={activePolygon === polygons.values[key]._id}
          onPolygonClick={onClickArea}
        />
      ))}
    </div>
  </Visible>
);

Areas.propTypes = {
  activePolygon: PropTypes.string,
  polygons: PropTypes.object.isRequired,
  isAreasVisible: PropTypes.bool.isRequired,
  onClickArea: PropTypes.func.isRequired,
  checkMyArea: PropTypes.func.isRequired,
};

export default Areas;
