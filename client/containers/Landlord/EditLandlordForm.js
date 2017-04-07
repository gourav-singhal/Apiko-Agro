import _ from 'lodash';
import { I18n } from 'react-i18nify';
import { connect } from 'react-redux';
import { withHandlers, withState, compose, withProps } from 'recompose';
import { get, put, remove, APIAddresses } from '../../utils/api';
import { uploadToAS3 } from '../../utils/FileUploaders/AS3Uploader';
import LandlordForm from '../../components/Landlord/LandlordForm';
import { initLandlords, updateLandlord } from './actions';
import { DEFAULT_FORM_STATE } from '../General/form-validation';
import isFormValid from './form-validation';
import { sideBarOpenPrevious } from '../SideBar/siteBarActions';
import { showSuccess } from '../Notificator/actions';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
    landlord: _.get(state, 'sideBar.data.selectedItem') || {},
  })),
  withProps({
    statuses: [{
      text: I18n.t('dead'),
      value: 'dead',
    }, {
      text: I18n.t('alive'),
      value: 'alive',
    }],
  }),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withState('confirmModal', 'setConfirmModal', false),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();

      if (!isFormValid(formData, props)) {
        return;
      }
      const target = e.target;
      const files = target.file.files;
      const { dispatch, sideBar, setFormState, landlord } = props;
      const setFormError = err => {
        setFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message });
      };
      const setFormSuccess = () => {
        dispatch(showSuccess('success', 'landlord_updated'));
        sideBarOpenPrevious(sideBar, dispatch);
        target.reset();
      };

      setFormState({ ...DEFAULT_FORM_STATE, loading: true });

      if (files.length > 0) {
        uploadToAS3(files)
          .then(uploadedFiles => {
            put(`${APIAddresses.LANDLORDS}/${landlord._id}`,
              { ...formData, files: uploadedFiles })
              .then(res => dispatch(updateLandlord(res.data, res.data._id)))
              .then(setFormSuccess)
              .catch(setFormError);
          })
          .catch(setFormError);
      } else {
        put(`${APIAddresses.LANDLORDS}/${landlord._id}`, { ...formData })
          .then(res => dispatch(updateLandlord(res.data, res.data._id)))
          .then(setFormSuccess)
          .catch(setFormError);
      }
    },
    onDelete: props => landlordId => () => {
      const { dispatch, sideBar, setConfirmModal, setFormState } = props;
      remove(`${APIAddresses.LANDLORDS}/${landlordId}`)
        .then(() => {
          get(APIAddresses.LANDLORDS).then(res => {
            dispatch(initLandlords(res.data.landlords));
          });
        })
        .then(() => setFormState({ ...DEFAULT_FORM_STATE }))
        .catch();
      dispatch(showSuccess('success', 'contract_removed'));
      sideBarOpenPrevious(sideBar, dispatch);
      setConfirmModal(false);
    },
    openConfirm: props => (e) => {
      e.preventDefault();
      props.setConfirmModal(true);
    },
    closeConfirm: props => (e) => {
      e.preventDefault();
      props.setConfirmModal(false);
    },
  }),
);

export default enhance(LandlordForm);
