import React, { PropTypes } from 'react';
import { List, Icon } from 'semantic-ui-react';

const LocalityItem = ({
  locality,
  isActive,
  isActiveFields,
  onSelectLocality,
  depLocalitiesLength,
  onRemoveLocality,
  onPolygonIconClick,
  onFieldIconClick,
  isMapPanel,
}) => {
  const getRemoveIcon = () => depLocalitiesLength > 1 && (
    <Icon
      name="remove"
      onClick={() => onRemoveLocality(locality._id)}
      className="right floated"
    />
  ) || null;

  const getIcons = () => (
    <List.Content className="right floated">
      <Icon
        name={isActiveFields ? 'map' : 'map outline'}
        onClick={e => onFieldIconClick(e, locality._id)}
      />
      <Icon
        name={isActive ? 'unhide' : 'hide'}
        onClick={e => onPolygonIconClick(e, locality._id)}
      />
    </List.Content>
  );

  return (
    <List.Item
      onClick={isMapPanel ?
        () => onSelectLocality(locality) : () => {}}
      className={isActive ? 'active' : ''}
    >
      {isMapPanel ? getIcons() : getRemoveIcon()}
      <List.Content className="locality-item-in-departs">
        {locality.name}
      </List.Content>
    </List.Item>
  );
};

LocalityItem.propTypes = {
  locality: PropTypes.object.isRequired,
  isActive: PropTypes.bool.isRequired,
  onSelectLocality: PropTypes.func.isRequired,
  onRemoveLocality: PropTypes.func.isRequired,
  onPolygonIconClick: PropTypes.func.isRequired,
  onFieldIconClick: PropTypes.func.isRequired,
  isMapPanel: PropTypes.bool,
  isActiveFields: PropTypes.bool,
  depLocalitiesLength: PropTypes.number.isRequired,
};

export default LocalityItem;
