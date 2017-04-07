import React, { PropTypes } from 'react';
import { Translate } from 'react-i18nify';
import { Modal } from 'semantic-ui-react';
import { InfoWindow } from 'react-google-maps';

import EditLandlordForm from '../../containers/Landlord/EditLandlordForm';
import Visible from '../General/Visible';

const PolygonTooltip = ({
  polygon,
  area = {},
  landlords = [],
  infoWindowPosition,
  setInfoWindPosition,
}) => (
  <Visible isVisible={!!infoWindowPosition && !!polygon._id}>
    <InfoWindow
      onCloseClick={() => setInfoWindPosition(null)}
      position={infoWindowPosition}
    >
      <div>
        <h5><Translate value="cadastral-number" />: {polygon.cadastralNumber}</h5>
        <h5><Translate value="square" />: {polygon.square}</h5>
        {area && <h5><Translate value="area-status" />: {area.status}</h5>}

        {landlords && <h5><Translate value="landlords" /></h5>}
        <ul>
          {landlords && landlords.map(
            (landlord, index) =>
              <li key={index}>
                <Modal trigger={<a>{landlord.fullName}</a>}>
                  <Modal.Content>
                    <Modal.Description>
                      <EditLandlordForm data={landlord} />
                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </li>
          )
          }
        </ul>
      </div>
    </InfoWindow>
  </Visible>
);

PolygonTooltip.propTypes = {
  polygon: PropTypes.object,
  area: PropTypes.object,
  landlords: PropTypes.array,
  infoWindowPosition: PropTypes.object,
  setInfoWindPosition: PropTypes.func,
};

export default PolygonTooltip;
