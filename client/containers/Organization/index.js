import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { put, post, get, APIAddresses } from '../../utils/api';
import { showSuccess } from '../Notificator/actions';
import { initFields } from '../Fields/actions';
import {
  createOrganization,
  updateOrganization,
} from './actions';
import Organization from '../../components/Organization';
import { DEFAULT_FORM_STATE, getEmptyField } from '../General/form-validation';

const isFormValid = (formData, props) => {
  const emptyValueName = getEmptyField(formData, ['comment', 'file']);
  if (emptyValueName) {
    props.changeFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  return true;
};


const propsData = connect(
  ({ localities, organization, departments }) => ({
    organization,
    localities,
    departments: _.values(departments.values),
  })
);

const enhance = compose(
  propsData,
  withState('formState', 'changeFormState', DEFAULT_FORM_STATE),
  withHandlers({
    getLocalityOptions: ({ localities }) => () =>
       localities && localities.map(locality => ({
         text: locality.formattedAddress,
         value: locality._id,
       })),
    getExistingLocalities: ({ organization }) => () =>
      organization && organization.localities.map(locality => locality.id),
    onSubmit: ({ organization, ...props }) => (e, { formData }) => {
      e.preventDefault();
      if (organization && _.isEqual(formData, _.omit(organization, '_id'))) {
        return;
      }
      const newOrganization = {
        ...formData,
        localities: formData.localities.map(locality => ({ id: locality })),
      };

      if (!isFormValid(formData, props)) {
        return;
      }

      const action = organization ? updateOrganization : createOrganization;
      const message = organization ? 'organ_success_updated' : 'organ_success_created';
      const method = organization && put || post;
      const url = organization ?
        `${APIAddresses.ORGANIZATIONS}/${organization._id}` : APIAddresses.ORGANIZATIONS;

      props.changeFormState({ ...DEFAULT_FORM_STATE, loading: true });

      Promise.all([
        method(url, newOrganization),
        get(APIAddresses.FIELDS),
      ])
        .then(([organizationRes, fieldsRes]) => {
          props.dispatch(showSuccess('success', message));
          props.dispatch(initFields(fieldsRes.data.fields));
          props.changeFormState(DEFAULT_FORM_STATE);
          props.dispatch(action(organizationRes.data));

          const organizationLocalities = organizationRes.data.localities.map(
            locality => locality.id
          );
          const departments = props.departments;
          const getExistingLocalities = (departmentLocalities) =>
            _.intersection(departmentLocalities, organizationLocalities);

          const departmentsToUpdate = departments && departments.filter((department) =>
            getExistingLocalities(department.localitiesIds, organizationLocalities).length !==
            department.localitiesIds.length
          ) || [];

          departmentsToUpdate.forEach(department => {
            const updatedDepartment = _.pick(
              _.extend(
                department,
                { localitiesIds: getExistingLocalities(department.localitiesIds) }
              ),
              ['_id', 'localitiesIds', 'name', 'organizationId']
            );
            put(`${APIAddresses.DEPARTMENTS}/${department._id}`, updatedDepartment)
              .then(() => {
                props.dispatch(showSuccess('success', 'organ_success_updated'));
              })
              .catch(
                err => props.changeFormState({ ...DEFAULT_FORM_STATE, error: err.response
                && err.response.data.message }));
          });
        })
        .catch(err =>
          props.changeFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message }));
    },
  }),
);

export default enhance(Organization);
