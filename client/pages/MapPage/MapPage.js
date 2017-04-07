import React from 'react';
import './style.scss';

import SideBar from '../../containers/SideBar';
import MapPanel from '../../containers/MapPanel';
import Map from '../../containers/Map';

const MapPage = () =>
  <div>
    <div className="map-sidebar">
      <MapPanel />
    </div>

    <Map
      containerElement={<div />}
      mapElement={<div className="map" />}
    />
    <SideBar />
  </div>;

export default MapPage;
