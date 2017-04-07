import { withHandlers, withState, compose } from 'recompose';
import InviteUserForm from '../../../components/Authorization/InviteUserForm';
import { post, APIAddresses } from '../../../utils/api';
import { I18n } from 'react-i18nify';
import { DEFAULT_FORM_STATE, isEmailValid } from '../../General/form-validation';

const isFormValid = (email, props) => {
  if (!email.length || !isEmailValid(email)) {
    props.setFormState({
      ...DEFAULT_FORM_STATE,
      warning: { name: 'email' },
    });
    return false;
  }
  return true;
};

const enhance = compose(
  withState('formState', 'setFormState', { ...DEFAULT_FORM_STATE, success: false }),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();

      if (!isFormValid(formData.email, props)) {
        return;
      }

      const changeState = (newProps) => {
        props.setFormState({ ...DEFAULT_FORM_STATE, ...newProps });
      };

      const target = e.target;
      const postData = {
        email: formData.email,
        subject: I18n.t('invite_emai  l_subject'),
        language: I18n._localeKey,
      };
      changeState({ loading: true });
      post(APIAddresses.INVITE_USER, postData)
        .then(() => {
          changeState({ success: true });
          target.reset();
        })
        .catch(() => {
          changeState({ error: true });
        });
    },
  }),
);

export default enhance(InviteUserForm);
