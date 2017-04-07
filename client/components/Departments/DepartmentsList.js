import React, { PropTypes } from 'react';

import { Translate } from 'react-i18nify';
import { Accordion, Button } from 'semantic-ui-react';
import Localities from '../../containers/Departments/Localities';
import Visible from '../General/Visible';

const DepartmentsList = ({
  departments,
  onRemoveDepartment,
  isMapPanel,
  dropdownLocalities,
}) => {
  const panels = departments.keys.map(id => ({
    key: id,
    title: departments.values[id].name,
    active: true,
    content: (
      <div>
        <Localities
          dropdownLocalities={dropdownLocalities}
          departmentId={id}
          localitiesIds={departments.values[id].localitiesIds}
          isMapPanel={isMapPanel}
        />
        <Visible isVisible={!isMapPanel}>
          <div>
            <hr />
            <Button
              className="remove-department-but"
              color="red"
              onClick={() => onRemoveDepartment(id)}
              fluid
            >
              <Translate value="remove" />
            </Button>
          </div>
        </Visible>
      </div>
    ),
  }));

  return (
    <div className={!isMapPanel && 'items-list-sidebar'}>
      <Visible
        isVisible={!!departments.keys.length}
        defaultContent={
          <h3 className="no-items">
            <Translate value="no_departments" />
          </h3>
        }
      >
        <Accordion styled exclusive={false} panels={panels} />
      </Visible>
    </div>
  );
};

DepartmentsList.propTypes = {
  isMapPanel: PropTypes.bool,
  departments: PropTypes.object.isRequired,
  ownLocalities: PropTypes.array,
  onRemoveDepartment: PropTypes.func.isRequired,
  dropdownLocalities: PropTypes.array,
};

export default DepartmentsList;
