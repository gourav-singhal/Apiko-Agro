import React, { PropTypes } from 'react';
import CreateDepartmentForm from '../../containers/Departments/CreateDepartmentForm';
import DepartmentsList from './DepartmentsList';
import './style.scss';
import ColorPicker from '../../containers/General/ColorPicker';
import Visible from '../General/Visible';

const Departments = ({
  departments,
  organization,
  ownLocalities,
  onRemove,
  notInDepartsLocalities,
  activeLocality,
  changeLocalityColor,
  getActiveLocalityColor,
  isMapPanel = false,
}) => (
  <div>
    <Visible isVisible={!isMapPanel}>
      <CreateDepartmentForm
        organization={organization}
        dropdownLocalities={notInDepartsLocalities}
      />
    </Visible>

    <Visible isVisible={isMapPanel && !!activeLocality}>
      <div className="localities-color-picker">
        <ColorPicker
          width={25}
          value={getActiveLocalityColor()}
          onChange={changeLocalityColor}
        />
      </div>
    </Visible>

    <DepartmentsList
      onRemoveDepartment={onRemove}
      departments={departments}
      dropdownLocalities={notInDepartsLocalities}
      ownLocalities={ownLocalities}
      isMapPanel={isMapPanel}
    />
  </div>
);

Departments.propTypes = {
  onRemove: PropTypes.func.isRequired,
  isMapPanel: PropTypes.bool,
  activeLocality: PropTypes.string,
  departments: PropTypes.object,
  organization: PropTypes.object,
  notInDepartsLocalities: PropTypes.array,
  ownLocalities: PropTypes.array,
  changeLocalityColor: PropTypes.func,
  getActiveLocalityColor: PropTypes.func,
};

export default Departments;
