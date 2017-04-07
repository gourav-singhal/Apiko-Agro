import React, { PropTypes } from 'react';
import { Polygon, OverlayView } from 'react-google-maps';

const PolygonAgro = ({
  data,
  activateField,
  addGoogleListeners,
  getOptions,
  getPixelPositionOffset,
  getContentCoordinate,
  children,
}) => {
  let polygon;
  return (
    <div>
      <Polygon
        ref={elem => { polygon = elem; }}
        paths={data.coordinates}
        options={getOptions()}
        onClick={activateField}
        onMouseDown={() => addGoogleListeners(polygon)}
      />
      <OverlayView
        position={getContentCoordinate()}
        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        getPixelPositionOffset={getPixelPositionOffset}
      >
        <div>{children}</div>
      </OverlayView>
    </div>
  );
};

PolygonAgro.propTypes = {
  data: PropTypes.object.isRequired,
  onEditPolygon: PropTypes.func.isRequired,
  addGoogleListeners: PropTypes.func.isRequired,
  activateField: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
  getContentCoordinate: PropTypes.func.isRequired,
  getPixelPositionOffset: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default PolygonAgro;
