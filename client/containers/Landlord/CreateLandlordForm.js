import _ from 'lodash';
import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { withHandlers, withState, compose, withProps } from 'recompose';
import { sideBarOpenPrevious } from '../SideBar/siteBarActions';
import { post, APIAddresses } from '../../utils/api';
import { uploadToAS3 } from '../../utils/FileUploaders/AS3Uploader';
import LandlordForm from '../../components/Landlord/LandlordForm';
import { addLandlord } from './actions';
import { DEFAULT_FORM_STATE } from '../General/form-validation';
import isFormValid from './form-validation';
import { showSuccess } from '../Notificator/actions';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
  })),
  withProps({
    statuses: [{
      text: I18n.t('dead'),
      value: 'dead',
    }, {
      text: I18n.t('alive'),
      value: 'alive',
    }],
    isCreateForm: true,
  }),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      if (!isFormValid(formData, props)) {
        return;
      }
      const target = e.target;
      const files = target.file.files;
      const { sideBar } = props;

      const setFormError = err => {
        props.setFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message });
      };
      const setFormSuccess = (landlord) => {
        const onNewLandlordAdd = _.get(sideBar, 'data.onNewLandlordAdd');
        showSuccess('success', 'landlord_created');
        target.reset();
        if (onNewLandlordAdd) {
          onNewLandlordAdd(landlord, sideBar);
        } else {
          sideBarOpenPrevious(props.sideBar, props.dispatch);
        }
      };

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });

      if (files.length > 0) {
        uploadToAS3(files)
          .then(uploadedFiles => {
            post(APIAddresses.LANDLORDS, { ...formData, files: uploadedFiles })
              .then((res) => props.dispatch(addLandlord(res.data)))
              .then(setFormSuccess)
              .catch(setFormError);
          })
          .catch(setFormError);
      } else {
        post(APIAddresses.LANDLORDS, { ...formData })
          .then((res) => props.dispatch(addLandlord(res.data)))
          .then(setFormSuccess)
          .catch(setFormError);
      }
    },
  }),
);

export default enhance(LandlordForm);
