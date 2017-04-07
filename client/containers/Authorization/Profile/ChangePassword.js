import { withHandlers, withState, compose } from 'recompose';
import ChangePasswordForm from '../../../components/Authorization/Profile/ChangePasswordForm';
import { connect } from 'react-redux';
import { I18n } from 'react-i18nify';
import { put, APIAddresses } from '../../../utils/api/';
import { showSuccess } from '../../Notificator/actions';
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

  if (formData.newPassword !== formData.passwordConfirm) {
    setWarning({
      name: 'passwordConfirm',
      message: I18n.t('passwords_not_match'),
    });
    return false;
  }

  if (formData.newPassword.length < 6) {
    setWarning({
      name: 'newPassword',
      message: I18n.t('too_short_pass'),
    });
    return false;
  }

  return true;
};

const enhance = compose(
  connect(state => ({
    query: state.routing.locationBeforeTransitions.query,
  })),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      const target = e.target;

      if (!isFormValid(formData, props)) {
        return;
      }
      const changeFormState = (newProps) => {
        props.setFormState({ ...DEFAULT_FORM_STATE, ...newProps });
      };

      changeFormState({ loading: true });
      put(APIAddresses.ACCOUNT_CHANGE_PASSWORD, formData)
        .then(() => {
          changeFormState({});
          props.dispatch(showSuccess('success', 'profile_changed'));
          target.reset();
        })
        .catch(err => {
          if (err.response.status === 406) {
            changeFormState({
              warning: {
                name: 'oldPassword',
                message: I18n.t('incorrect_old_password'),
              },
            });
          } else {
            changeFormState({ error: true });
          }
        });
    },
  })
);

export default enhance(ChangePasswordForm);
