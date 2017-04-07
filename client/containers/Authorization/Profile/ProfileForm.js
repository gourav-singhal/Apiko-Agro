import _ from 'lodash';
import { withHandlers, withState, compose } from 'recompose';
import { connect } from 'react-redux';
import UserProfileForm from '../../../components/Authorization/Profile/UserProfileForm';
import { put, APIAddresses } from '../../../utils/api';
import { showSuccess } from '../../Notificator/actions';
import { setUser } from '../Login/actions';
import { DEFAULT_FORM_STATE, getEmptyField } from '../../General/form-validation';

const isFormValid = (formData, props) => {
  const setWarning = (warning) => {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning });
  };

  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    setWarning({ name: emptyValueName });
    return false;
  }
  return true;
};

const enhance = compose(
  connect(
    state => ({
      user: state.authorization.user,
    })
  ),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      if (!isFormValid(formData, props)) {
        return;
      }
      const changeFormState = (newProps) => {
        props.setFormState({ ...DEFAULT_FORM_STATE, ...newProps });
      };

      changeFormState({ loading: true });
      put(`${APIAddresses.ACCOUNT}/${props.user._id}`, { profile: formData })
        .then(() => {
          // change from state to default
          changeFormState({});
          props.dispatch(setUser(_.extend(props.user, { profile: formData })));
          props.dispatch(showSuccess('success', 'profile_changed'));
        })
        .catch(() => {
          changeFormState({ error: true, loading: false });
        });
    },
  }),
);

export default enhance(UserProfileForm);
