import React, { PropTypes } from 'react';
import { Segment, Icon, Accordion } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

import Departments from '../../containers/Departments';

import './style.scss';


const MapPanel = ({ organization }) => {
  if (!organization || !organization.localities || !organization.localities.length) {
    return null;
  }

  return (
    <Segment className="map-panel">
      <Accordion styled defaultActiveIndex={0}>

        <Accordion.Title>
          <Icon name="dropdown" />
          <Translate value="departments" />
        </Accordion.Title>

        <Accordion.Content>
          <Departments isMapPanel />
        </Accordion.Content>
      </Accordion>
    </Segment>
  );
};

MapPanel.propTypes = {
  organization: PropTypes.object,
};

export default MapPanel;
