import { compose, withHandlers, withState } from 'recompose';

import { connect } from 'react-redux';
import CreateDepartmentForm from '../../components/Departments/CreateDepartmentForm';
import { post, APIAddresses } from '../../utils/api';
import { showSuccess } from '../Notificator/actions';
import { pushDepartment } from './actions';
import { DEFAULT_FORM_STATE, getEmptyField } from '../General/form-validation';

const isFormValid = (formData, props) => {
  const emptyValueName = getEmptyField(formData, ['comment', 'file']);
  if (emptyValueName) {
    props.changeFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  return true;
};
export const dropdownState = withState('dropdownState', 'changeDropdownState', []);

// options for dropdown
export const getLocalityOptions = ({ dropdownLocalities }) => () => (
  dropdownLocalities.map(locality => ({
    text: locality.name,
    value: locality._id,
  }))
);

export const onChangeDropdown = ({
  changeDropdownState,
}) => (e, { value }) => {
  changeDropdownState(value);
};

const onSubmit = props => (e, { formData }) => {
  e.preventDefault();

  const { name, localities } = formData;
  const { organization, dispatch, changeFormState, formState, changeDropdownState } = props;

  if (!isFormValid(formData, props)) {
    return;
  }

  if (!organization._id) {
    changeFormState({ ...formState, error: 'create_organization' });
    return;
  }

  const department = {
    name,
    localitiesIds: localities,
    organizationId: organization._id,
  };

  changeFormState({ ...formState, loading: true });
  post(APIAddresses.DEPARTMENTS, department)
    .then(({ data }) => {
      dispatch(pushDepartment({ ...department, _id: data.id }));
      dispatch(showSuccess('success', 'department_created'));
      changeDropdownState([]);
      props.changeFormState({ ...DEFAULT_FORM_STATE });
    })
    .catch(err =>
      props.changeFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message }));
};

const enhance = compose(
  connect(), // for access to "dispatch" in props
  withState('formState', 'changeFormState', DEFAULT_FORM_STATE),
  dropdownState,
  withHandlers({
    getLocalityOptions,
    onSubmit,
    onChangeDropdown,
  }),
);

export default enhance(CreateDepartmentForm);
