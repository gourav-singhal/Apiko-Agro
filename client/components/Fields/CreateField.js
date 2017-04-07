import React, { PropTypes } from 'react';

import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';

import Polygon from '../../containers/Polygons/Polygon';
import Visible from '../General/Visible';

const drawingOptions = {
  drawingControl: false,
  polygonOptions: {
    strokeWeight: 2,
    strokeOpacity: 1,
  },
};

const CreateField = ({
  onPolygonComplete,
  onUpdatePolygon,
  drawedPolygon,
  drawingMode,
}) => (
  <div>
    <DrawingManager
      onPolygonComplete={onPolygonComplete}
      options={{
        drawingMode,
        ...drawingOptions,
      }}
    />
    <Visible isVisible={!!drawedPolygon.coordinates && !drawedPolygon.name}>
      <Polygon
        data={drawedPolygon}
        zIndex={1}
        options={{ editable: true }}
        onEditPolygon={onUpdatePolygon}
        isActive
      />
    </Visible>
  </div>
);

CreateField.propTypes = {
  drawingMode: PropTypes.string,
  onUpdatePolygon: PropTypes.func,
  onPolygonComplete: PropTypes.func,
  drawedPolygon: PropTypes.object,
};

export default CreateField;
