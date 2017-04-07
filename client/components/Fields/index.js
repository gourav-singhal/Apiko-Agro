import React, { PropTypes } from 'react';

import { InfoWindow } from 'react-google-maps';

import Polygon from '../../containers/Polygons/Polygon';
import Visible from '../General/Visible';
import FieldInfoCard from '../../containers/Fields/FieldInfoCard';
import './style.scss';

const Fields = ({
  fields,
  activeField = {},
  onClickField,
  isFieldActive,
  onUpdateField,
  getColorOfField,
  infoWindowPosition,
  closeInfoWindow,
  isFieldsVisible,
}) => (
  <Visible isVisible={isFieldsVisible}>
    <div>
      {fields.keys.map(key => (
        <Visible key={`field-${key}`} isVisible={isFieldActive(key)}>
          <Polygon
            zIndex={1}
            data={fields.values[key]}
            color={getColorOfField(fields.values[key])}
            isActive={activeField._id === key}
            onPolygonClick={onClickField}
            onEditPolygon={onUpdateField}
          >
            <span><b>{fields.values[key].name}</b></span>
          </Polygon>
        </Visible>
      ))}
      <Visible isVisible={!!infoWindowPosition.lat && !!activeField._id}>
        <InfoWindow
          onCloseClick={closeInfoWindow}
          position={infoWindowPosition}
        >
          <FieldInfoCard />
        </InfoWindow>
      </Visible>
    </div>
  </Visible>
);

Fields.propTypes = {
  activeField: PropTypes.object,
  fields: PropTypes.object.isRequired,
  isFieldsVisible: PropTypes.bool.isRequired,
  isFieldActive: PropTypes.func.isRequired,
  onClickField: PropTypes.func,
  closeInfoWindow: PropTypes.func,
  onUpdateField: PropTypes.func,
  getColorOfField: PropTypes.func,
  infoWindowPosition: PropTypes.object,
};

export default Fields;
