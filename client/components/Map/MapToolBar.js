import React, { PropTypes } from 'react';
import { Icon, Menu, Popup, Dropdown, Checkbox } from 'semantic-ui-react';
import { I18n, Translate } from 'react-i18nify';

const MapToolBar = ({
  setMapType,
  setDrawingMode,
  layers,
  myAreasFilter,
  toggleHighlightLoc,
  mapType,
  drawingMode,
  isHighlightedLoc,
  setFieldsFilter,
  setAreasFilter,
  toggleMyAreasFilter,
}) => (
  <div className="map-toolbar">
    <Menu icon compact className="map-type-tools">
      <Popup
        trigger={
          <Menu.Item
            name="terrain"
            active={mapType === 'terrain'}
            onClick={() => setMapType('terrain')}
          >
            <Icon name="map outline" />
          </Menu.Item>
        }
        content={I18n.t('terrain_map')}
        size="mini"
      />

      <Popup
        trigger={
          <Menu.Item
            name="satellite"
            active={mapType === 'satellite'}
            onClick={() => setMapType('satellite')}
          >
            <Icon name="globe" />
          </Menu.Item>
        }
        content={I18n.t('satellite_map')}
        size="mini"
      />
    </Menu>

    <Menu icon compact className="map-drawing-tools">
      <Popup
        trigger={
          <Menu.Item
            name="selectItems"
            active={!drawingMode}
            onClick={() => setDrawingMode(null)}
          >
            <Icon name="hand paper" />
          </Menu.Item>
        }
        content={I18n.t('select_items')}
        size="mini"
      />

      <Popup
        trigger={
          <Menu.Item
            name="drawPolygon"
            active={drawingMode === 'polygon'}
            onClick={() => setDrawingMode('polygon')}
          >
            <Icon name="object ungroup" />
          </Menu.Item>
        }
        content={I18n.t('draw_polygon')}
        size="mini"
      />
    </Menu>

    <Menu icon compact className="map-drawing-tools">
      <Popup
        trigger={
          <Menu.Item
            name="highlightLocalities"
            active={isHighlightedLoc}
            onClick={toggleHighlightLoc}
          >
            <Icon name="safari" />
          </Menu.Item>
        }
        content={I18n.t('highlight_localities')}
        size="mini"
      />

      <Dropdown item text={I18n.t('layers')}>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Checkbox
              label={<label><Translate value="fields" /></label>}
              checked={layers.isFields}
              onChange={setFieldsFilter}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Checkbox
              label={<label><Translate value="areas" /></label>}
              checked={layers.isAreas}
              onChange={setAreasFilter}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Popup
        trigger={
          <Menu.Item
            name="filter"
            active={myAreasFilter}
            onClick={toggleMyAreasFilter}
          >
            <Icon name="filter" />
          </Menu.Item>
        }
        content={I18n.t('areas_of_organization')}
        size="mini"
      />
    </Menu>
  </div>
);

MapToolBar.propTypes = {
  drawingMode: PropTypes.string,
  myAreasFilter: PropTypes.bool.isRequired,
  isHighlightedLoc: PropTypes.bool.isRequired,
  mapType: PropTypes.string.isRequired,
  layers: PropTypes.object.isRequired,
  setMapType: PropTypes.func.isRequired,
  toggleHighlightLoc: PropTypes.func.isRequired,
  setDrawingMode: PropTypes.func.isRequired,
  setAreasFilter: PropTypes.func.isRequired,
  setFieldsFilter: PropTypes.func.isRequired,
  toggleMyAreasFilter: PropTypes.func.isRequired,
};

export default MapToolBar;
