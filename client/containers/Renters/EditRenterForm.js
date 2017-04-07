import _ from 'lodash';
import { connect } from 'react-redux';
import { withHandlers, withState, compose } from 'recompose';
import { remove, put, APIAddresses } from '../../utils/api';
import { removeRenter, updateRenter } from './actions';
import RenterForm from '../../components/Renters/RenterForm';
import { DEFAULT_FORM_STATE, getEmptyField } from '../General/form-validation';
import { sideBarOpenPrevious } from '../SideBar/siteBarActions';
import { showSuccess } from '../Notificator/actions';

const isFormValid = (formData, props) => {
  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    props.changeFormState({ ...DEFAULT_FORM_STATE, warning: { name: emptyValueName } });
    return false;
  }
  return true;
};

const onRemove = ({ dispatch, renter, sideBar, changeFormState }) => () => {
  remove(`${APIAddresses.RENTERS}/${renter._id}`)
    .then(() => {
      dispatch(removeRenter(renter._id));
      sideBarOpenPrevious(sideBar, dispatch);
      dispatch(showSuccess('success', 'renter_removed'));
    })
    .catch(err =>
      changeFormState({ error: err.response.statusText, ...DEFAULT_FORM_STATE }));
};

const onSubmit = props => (e, { formData }) => {
  e.preventDefault();

  if (!isFormValid(formData, props)) {
    return;
  }

  const { dispatch, changeFormState, formState, renter } = props;
  changeFormState({ ...formState, loading: true });
  put(`${APIAddresses.RENTERS}/${renter._id}`, formData)
    .then(() => {
      dispatch(updateRenter({ ...formData, _id: renter._id }));
      dispatch(showSuccess('success', 'renter_updated'));
      sideBarOpenPrevious(props.sideBar, props.dispatch);
    })
    .catch(err =>
      changeFormState({ ...DEFAULT_FORM_STATE, error: err.response.statusText }));
};

const enhance = compose(
  connect(state => ({
    renter: _.get(state, 'sideBar.data.selectedItem'),
    sideBar: state.sideBar,
  })),
  withState('formState', 'changeFormState', DEFAULT_FORM_STATE),
  withState('isOpenConfirm', 'setConfirm', false),
  withHandlers({ onSubmit, onRemove }),
);

export default enhance(RenterForm);
