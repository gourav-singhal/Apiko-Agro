import _ from 'lodash';
import { withHandlers, withState, compose } from 'recompose';
import { connect } from 'react-redux';
import { withToDropdownOptions } from '../../RecomposeExtensions';
import { put, APIAddresses } from '../../../utils/api';
import { showSuccess } from '../../Notificator/actions';
import { uploadToAS3 } from '../../../utils/FileUploaders/AS3Uploader';
import { sideBarOpen } from '../../SideBar/siteBarActions';
import EditAreaForm from '../../../components/Areas/EditAreaForm';
import { DEFAULT_FORM_STATE, isFormValid } from '../CreateArea/form-validation';

const mapStateToProps = (state) => {
  const areaId = _.get(state, 'sideBar.data.selectedItem._id');
  const area = state.areas.values[areaId];
  return {
    currentArea: { ...area },
  };
};
const enhance = compose(
  connect(mapStateToProps),
  withToDropdownOptions(),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onExchangeButtonClick: ({ currentArea, sideBar, dispatch }) => () =>
      sideBarOpen('exchangeArea', sideBar, dispatch, currentArea),
    onSave: props => (e, { formData }) => {
      e.preventDefault();
      const target = e.target;
      const areaId = props.currentArea._id;
      const files = target.file.files;

      if (!isFormValid(formData, props)) {
        return false;
      }

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      const setErr = err =>
        props.setFormState({ ...DEFAULT_FORM_STATE, error: err.response.statusText });

      const updateArea = data =>
        put(`${APIAddresses.AREAS}/${areaId}`, data)
          .then(() => {
            props.dispatch(showSuccess('success', 'area_updated'));
            sideBarOpen('areas', props.sideBar, props.dispatch);
          })
          .catch(setErr);

      const updateAreaWithFiles = data =>
        uploadToAS3(files)
          .then(uploadedFiles => updateArea({ ...data, files: uploadedFiles }));

      return files.length > 0 ? updateAreaWithFiles(formData) : updateArea(formData);
    } }
  )
);

export default enhance(EditAreaForm);
