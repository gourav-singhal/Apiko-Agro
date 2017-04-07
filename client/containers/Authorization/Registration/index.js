import { withHandlers, withState, compose, lifecycle } from 'recompose';
import { browserHistory } from 'react-router';
import RegistrationForm from '../../../components/Authorization/RegistrationForm';
import { connect } from 'react-redux';
import { get, post, APIAddresses } from '../../../utils/api/';
import { I18n } from 'react-i18nify';

import { DEFAULT_FORM_STATE, getEmptyField, isEmailValid } from '../../General/form-validation';
const ERROR_MESSAGES = {
  'Token not found': 'token_not_found',
};

const isFormValid = (formData, props) => {
  const setWarning = (warning) => {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning });
  };

  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    setWarning({ name: emptyValueName });
    return false;
  }

  if (!isEmailValid(formData.email)) {
    setWarning({
      name: 'email',
      message: I18n.t('incorrect_email'),
    });
    return false;
  }

  if (formData.password.length < 6) {
    setWarning({
      name: 'password',
      message: I18n.t('too_short_pass'),
    });
    return false;
  }

  if (formData.password !== formData.passwordConfirm) {
    setWarning({
      name: 'passwordConfirm',
      message: I18n.t('passwords_not_match'),
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
  withState('email', 'setEmail', ''),
  lifecycle({
    componentWillMount() {
      const invitationToken = this.props.query && this.props.query.inviteToken;
      if (invitationToken) {
        this.props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
        get(`${APIAddresses.INVITE_USER}/${invitationToken}`)
          .then(responce => {
            this.props.setFormState({ loading: false, ...DEFAULT_FORM_STATE });
            this.props.setEmail(responce.data.email);
          })
          .catch(({ response }) => {
            this.props.setFormState({ ...DEFAULT_FORM_STATE, error: response.data.message });
          });
      }
    },
  }),
  withHandlers({
    errorMessage: props => () => props.formState.error &&
      I18n.t(ERROR_MESSAGES[props.formState.error]) || '',
    onBackButtonClick: () => () => browserHistory.push('/sign-in'),
    onRegister: props => (e, { formData }) => {
      e.preventDefault();

      if (!isFormValid(formData, props)) {
        return false;
      }
      const invitationToken = props.query && props.query.inviteToken;
      const url = invitationToken ?
        `${APIAddresses.ACCOUNT}/${invitationToken}` : APIAddresses.ACCOUNT;

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      post(url, formData)
        .then(result => {
          if (result.status === 200) {
            props.setFormState({ loading: false, ...DEFAULT_FORM_STATE });
            browserHistory.push('/sign-in');
          }
        })
        .catch(err => {
          props.setFormState({ ...DEFAULT_FORM_STATE, error: err.message });
        });
      return true;
    },
  })
);

export const Registration = enhance(RegistrationForm);
