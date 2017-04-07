import React, { PropTypes } from 'react';

import { List, Button, Form } from 'semantic-ui-react';
import { I18n, Translate } from 'react-i18nify';
import LocalityItem from '../../containers/Departments/LocalityItem';
import Visible from '../General/Visible';

// to do: must be refactored
const DepartmentLocalities = ({
  departmentLocalities,
  getLocalityOptions,
  onAddLocalities,
  onRemoveLocality,
  onChangeDropdown,
  dropdownState,
  isMapPanel,
}) => (
  <div>
    <List
      selection
      verticalAlign="middle"
      className="localities-list"
    >
      {departmentLocalities.map(locality => (
        <LocalityItem
          key={locality._id}
          locality={locality}
          isMapPanel={isMapPanel}
          depLocalitiesLength={departmentLocalities.length}
          onRemoveLocality={onRemoveLocality}
        />))}
    </List>
    <Visible isVisible={!isMapPanel}>
      <Form onSubmit={onAddLocalities}>
        <Form.Dropdown
          name="localities"
          placeholder={I18n.t('chose_villages')}
          options={getLocalityOptions()}
          value={dropdownState}
          onChange={onChangeDropdown}
          fluid
          multiple
          selection
        />
        <Button color="brown" type="submit" basic>
          <Translate value="add" />
        </Button>
      </Form>
    </Visible>
  </div>
);

DepartmentLocalities.propTypes = {
  departmentLocalities: PropTypes.array.isRequired,
  onAddLocalities: PropTypes.func.isRequired,
  getLocalityOptions: PropTypes.func.isRequired,
  dropdownState: PropTypes.array,
  onChangeDropdown: PropTypes.func,
  onRemoveLocality: PropTypes.func,
  isMapPanel: PropTypes.bool,
  activeLocality: PropTypes.string,
};

export default DepartmentLocalities;
