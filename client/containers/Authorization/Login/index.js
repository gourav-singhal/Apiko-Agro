import { withHandlers, withState, compose } from 'recompose';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { I18n } from 'react-i18nify';
import { Login } from '../../../components/Authorization/Login';
import { get, post, APIAddresses } from '../../../utils/api';
import { setAuthToken, setAuthUser } from '../../../utils/api/authorization';
import { sigIn, setUser } from './actions';

import { DEFAULT_FORM_STATE, getEmptyField } from '../../General/form-validation';

const EROR_MESSAGE = {
  'Not approved yet.': 'not_approved_message',
  'Incorrect username.': 'incorrect_username_message',
  'Incorrect password.': 'incorrect_password_message',
};
const isFormValid = (formData, props) => {
  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    props.setFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  return true;
};

const enhance = compose(
  connect(state => ({
    request: state.request,
  }),
  ),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onRegisterButtonClick: () => () => browserHistory.push('/register'),
    onLogin: props => (e, { formData }) => {
      e.preventDefault();

      if (!isFormValid(formData, props)) {
        return false;
      }

      const setError = err =>
        props.setFormState({ ...DEFAULT_FORM_STATE,
          error: I18n.t(EROR_MESSAGE[err.response.data.message] || 'error_message') });

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      return post(APIAddresses.SIGN_IN, formData)
      .then(result => {
        const token = result.data.token;
        setAuthToken(token);
        props.dispatch(sigIn(result.data.token, result.data.user));
        get(APIAddresses.ACCOUNT_ME)
          .then(res => {
            const { user } = res.data;
            props.dispatch(setUser(user));
            setAuthUser(user.username, user.roles);
            props.setFormState({ ...DEFAULT_FORM_STATE, loading: false });
            browserHistory.push('/');
          })
          .catch(setError);
      })
      .catch(setError);
    },
  }),
);

export const LoginContainer = enhance(Login);
