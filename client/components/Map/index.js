import React, { PropTypes } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
import './style.scss';

import Polygons from '../../containers/Polygons';
import Fields from '../../containers/Fields';
import MapToolBar from '../../containers/Map/MapToolBar';
import CreateField from '../../containers/Fields/CreateField';

import Visible from '../General/Visible';
import Spinner from '../General/Spinner';

const mapDefaultOptions = {
  defaultZoom: 9,
  defaultCenter: { lat: 49.537731, lng: 25.587350 },
  defaultOptions: {
    streetViewControl: false,
    mapTypeControl: false,
  },
};

const Map = ({ setCenter, mapType, isLoading }) => {
  let currentMap;
  return (
    <GoogleMap
      ref={googleMap => { currentMap = googleMap; }}
      mapTypeId={mapType}
      {...setCenter()}
      {...mapDefaultOptions}
    >
      <div className="map-content">
        <MapToolBar />

        <Polygons />
        <Fields getMapInstance={() => currentMap} />

        <CreateField />

        <Visible isVisible={!!isLoading}>
          <Spinner />
        </Visible>
      </div>
    </GoogleMap>
  );
};

Map.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  mapType: PropTypes.string.isRequired,
  setCenter: PropTypes.func.isRequired,
};

export default withGoogleMap(Map);
