import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { updateContract, removeContract } from '../ViewContracts/actions';
import { put, remove, APIAddresses } from '../../../utils/api';
import { withToDropdownOptions } from '../../RecomposeExtensions';
import isFormValid from '../CreateContract/form-validation';
import { DEFAULT_FORM_STATE } from '../../General/form-validation';
import editContractForm from '../../../components/Contracts/editContractForm';
import { sideBarOpenPrevious } from '../../SideBar/siteBarActions';
import { showSuccess } from '../../Notificator/actions';

const momentToDate = data => data && new Date(Date.parse(data.toDate().toISOString())) || null;

const stringToDate = (str) => new Date(Date.parse(str));

const enhance = compose(
  connect(state => ({
    polygons: state.polygons,
    sideBar: state.sideBar,
    contract: _.get(state, 'sideBar.data.selectedItem') || {},
  })),
  withToDropdownOptions(),
  withState('registrationDate', 'setRegistrationDate', null),
  withState('signatureDate', 'setSignatureDate', null),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withState('confirmModal', 'setConfirmModal', false),
  withHandlers({
    openConfirm: props => (e) => {
      e.preventDefault();
      props.setConfirmModal(true);
    },
    closeConfirm: props => (e) => {
      e.preventDefault();
      props.setConfirmModal(false);
    },
    onSave: props => (e, { formData }) => {
      e.preventDefault();
      if (!isFormValid(formData, props)) {
        return;
      }

      const { dispatch, sideBar, setFormState, contract } = props;
      const requestData = Object.assign({}, formData, {
        registrationDate: momentToDate(props.registrationDate) ||
        stringToDate(props.contract.registrationDate),
        signatureDate: momentToDate(props.signatureDate) ||
        stringToDate(props.contract.signatureDate),
        _id: contract._id,
      });
      setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      put(`${APIAddresses.CONTRACT}/${contract._id}`, requestData)
        .then(() => {
          dispatch(updateContract(requestData));
          setFormState({ ...DEFAULT_FORM_STATE, success: true });
          dispatch(showSuccess('success', 'contract_updated'));
          sideBarOpenPrevious(sideBar, dispatch);
        })
        .catch(err =>
          setFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message }));
    },
    onDelete: props => (e) => {
      e.preventDefault();
      const { dispatch, setConfirmModal, sideBar, setFormState, contract } = props;
      remove(`${APIAddresses.CONTRACT}/${contract._id}`)
        .then(() => {
          setConfirmModal(false);
          dispatch(removeContract(contract._id));
          dispatch(showSuccess('success', 'contract_removed'));
          sideBarOpenPrevious(sideBar, dispatch);
        })
        .catch(err =>
          setFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message }));
    },
    onRegistrationDatePick: props => date => {
      props.setRegistrationDate(date);
    },
    onSignatureDatePick: props => date => {
      props.setSignatureDate(date);
    },
  }),
);

export default enhance(editContractForm);
