import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Localities from '../../components/Departments/Localities';
import { put, APIAddresses } from '../../utils/api';
import { updateDepartment } from './actions';
import { showError } from '../Notificator/actions';

import {
  dropdownState,
  getLocalityOptions,
  onChangeDropdown,
} from './CreateDepartmentForm';

const mapStateToProps = ({
  localities, // <- from state
}, {
  localitiesIds, // <- from parent
}) => {
  const departmentLocalities = [];
  // localities without already added (full objects)
  localities.forEach(locality => {
    localitiesIds.forEach(id =>
      locality._id === id && departmentLocalities.push(locality)
    );
  });

  return { departmentLocalities };
};

const onRemoveLocality = ({ localitiesIds, dispatch, departmentId }) => localityId => {
  const newLocalitiesIds = localitiesIds.filter(id => id !== localityId);

  const updateObj = { localitiesIds: newLocalitiesIds };

  put(`${APIAddresses.DEPARTMENTS}/${departmentId}`, updateObj)
    .then(() => {
      dispatch(updateDepartment({ ...updateObj, _id: departmentId }));
    })
    .catch(() => {
      dispatch(showError('error', 'error_message'));
    });
};

const onAddLocalities = ({
  localitiesIds,
  dispatch,
  departmentId,
  changeDropdownState,
}) => (e, { formData }) => {
  e.preventDefault();

  const localitiesIdsToAdd = formData.localities;
  if (!localitiesIdsToAdd.length) {
    return;
  }

  const newLocalitiesIds = localitiesIds.concat(localitiesIdsToAdd);
  const updateObj = {
    localitiesIds: newLocalitiesIds,
  };

  put(`${APIAddresses.DEPARTMENTS}/${departmentId}`, updateObj)
    .then(() => {
      dispatch(updateDepartment({ ...updateObj, _id: departmentId }));
      changeDropdownState([]);
    })
    .catch(err => {
      dispatch(showError({
        title: 'error',
        text: err.response.statusText,
      }));
    });
};

const enhance = compose(
  connect(mapStateToProps),
  dropdownState,
  withHandlers({
    getLocalityOptions,
    onAddLocalities,
    onChangeDropdown,
    onRemoveLocality,
  })
);

export default enhance(Localities);
