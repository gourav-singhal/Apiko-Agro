import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import Departments from '../../components/Departments';
import { remove, put, APIAddresses } from '../../utils/api';
import { removeDepartment } from './actions';
import { showError } from '../Notificator/actions';
import { updateOrganization } from '../Organization/actions';
import loadingSpinner from '../General/LoadingSpinner';

const getOwnLocalities = (localities, organization) =>
  organization && localities.filter(locality =>
  organization.localities.some(ownLocality => ownLocality.id === locality._id)) || [];

const getNotInDepartsLocals = (ownLocalities, departments) => {
  const departmentsLocalitesIds = departments.keys.reduce((ids, nextKey) => (
    ids.concat(departments.values[nextKey].localitiesIds)
  ), []);
  return ownLocalities.filter(loc => !departmentsLocalitesIds.includes(loc._id));
};

const propsData = connect(
  // todo Stepan: remove activeLocality after departments will be refactored
  ({ localities, organization, departments, activeLocality }) => {
    const ownLocalities = getOwnLocalities(localities, organization);
    const notInDepartsLocalities = departments.keys ?
      getNotInDepartsLocals(ownLocalities, departments) : [];

    return {
      organization,
      ownLocalities,
      notInDepartsLocalities,
      departments,
      activeLocality,
    };
  }
);

const onRemove = ({ dispatch }) => departmentId => {
  remove(`${APIAddresses.DEPARTMENTS}/${departmentId}`, { departmentId })
    .then(() => {
      dispatch(removeDepartment(departmentId));
    })
    .catch(err => {
      dispatch(showError({
        title: 'error',
        text: err.response.statusText,
      }));
    });
};

// todo Stepan: move changeLocalityColor, getActiveLocalityColor
// after departments will be refactored
const changeLocalityColor = ({ dispatch, activeLocality, organization }) => color => {
  const localityData = organization.localities.find(locality => locality.id === activeLocality);
  localityData.color = color;
  put(`${APIAddresses.ORGANIZATIONS}/${organization._id}`, {
    localities: organization.localities,
  })
    .then(res => {
      dispatch(updateOrganization(res.data));
    })
    .catch(err => {
      dispatch(showError({
        title: 'error',
        text: err.response.statusText,
      }));
    });
};

const getActiveLocalityColor = ({ activeLocality, organization }) => () => {
  if (activeLocality) {
    const localityData = organization.localities.find(locality => locality.id === activeLocality);
    return localityData.color || null;
  }
  return null;
};

const enhance = compose(
  propsData,
  loadingSpinner(
    ({ departments }) => !!departments.keys
  ),
  withHandlers({ onRemove, changeLocalityColor, getActiveLocalityColor }),
);

export default enhance(Departments);
