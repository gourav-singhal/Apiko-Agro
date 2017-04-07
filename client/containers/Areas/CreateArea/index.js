import { withHandlers, withState, compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { get, post, APIAddresses } from '../../../utils/api/';
import { showSuccess, showError } from '../../Notificator/actions';
import CreateAreaForm from '../../../components/Areas/CreateAreaForm';
import { initLandlords } from '../../Landlord/actions';
import { initRenters } from '../../Renters/actions';
import { initContracts } from '../../Contracts/ViewContracts/actions';
import { uploadToAS3, config } from '../../../utils/FileUploaders/AS3Uploader';
import { sideBarOpen } from '../../SideBar/siteBarActions';
import { DEFAULT_FORM_STATE, isFormValid } from './form-validation';

const enhance = compose(
  connect(),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  lifecycle({
    componentWillMount() {
      const { dispatch } = this.props;
      this.props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      Promise.all([
        get(APIAddresses.LANDLORDS),
        get(APIAddresses.CONTRACT),
        get(APIAddresses.RENTERS),
        config(),
      ])
        .then(([landlords, contracts, renters]) => {
          dispatch(initLandlords(landlords.data.landlords));
          dispatch(initContracts(contracts.data.contracts));
          dispatch(initRenters(renters.data.renters));
          this.props.setFormState({ ...DEFAULT_FORM_STATE, loading: false });
        })
        .catch(err => dispatch(showError('error', err.response.statusText)));
    },
  }),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      const target = e.target;
      const files = target.file.files;

      if (!isFormValid(formData, props)) {
        return false;
      }

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      const setErr = err =>
        props.setFormState({ ...DEFAULT_FORM_STATE, error: err.response.statusText });

      const createArea = data =>
        post(APIAddresses.AREAS, data)
          .then(() => {
            props.dispatch(showSuccess('success', 'area-created'));
            target.reset();
            sideBarOpen('areas', props.sideBar, props.dispatch);
          })
          .catch(setErr);

      const createAreaWitFiles = data =>
        uploadToAS3(files)
          .then(uploadedFiles => createArea({ ...data, files: uploadedFiles }))
          .catch(setErr);

      return files.length > 0 ? createAreaWitFiles(formData) : createArea(formData);
    },
  })
);

export default enhance(CreateAreaForm);
