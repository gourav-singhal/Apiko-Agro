import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withState, withHandlers } from 'recompose';
import { pushContract } from '../ViewContracts/actions';
import { post, APIAddresses } from '../../../utils/api';
import { withToDropdownOptions } from '../../RecomposeExtensions';
import createContractForm from '../../../components/Contracts/createContractForm';
import isFormValid from './form-validation';
import { DEFAULT_FORM_STATE } from '../../General/form-validation';
import { sideBarOpenPrevious } from '../../SideBar/siteBarActions';

const enhance = compose(
  connect(state => ({
    polygons: state.polygons,
    sideBar: state.sideBar,
    selectedPolygonId: state.sideBar.data.formData && state.sideBar.data.formData.polygonId,
  })),
  withToDropdownOptions(),
  withState('registrationDate', 'setRegistrationDate', null),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withState('signatureDate', 'setSignatureDate', null),
  withHandlers({
    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      if (!isFormValid(formData, props)) {
        return;
      }

      const requestData = {
        ...formData,
        registrationDate: props.registrationDate.toDate(),
        signatureDate: props.signatureDate.toDate(),
      };
      const reduxData = {
        ...formData,
        registrationDate: props.registrationDate.toDate().toISOString(),
        signatureDate: props.signatureDate.toDate().toISOString(),
      };
      e.preventDefault();
      const target = e.target;

      const setFormError = err => {
        props.setFormState({ ...DEFAULT_FORM_STATE, error: err.response.data.message });
      };
      const setFormSuccess = response => {
        const onNewContractAdd = _.get(props, 'sideBar.data.onNewContractAdd');
        if (onNewContractAdd) {
          onNewContractAdd(response.contract, _.get(props, 'sideBar'));
        } else {
          sideBarOpenPrevious(props.sideBar, props.dispatch);
        }
        props.setFormState({ ...DEFAULT_FORM_STATE, success: true });
        target.reset();
      };
      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      post(APIAddresses.CONTRACT, requestData)
        .then((res) => props.dispatch(pushContract({ ...reduxData, _id: res.data._id })))
        .then(setFormSuccess)
        .catch(setFormError);
    },
    onRegistrationDatePick: props => date => {
      props.setRegistrationDate(date);
    },
    onSignatureDatePick: props => date => {
      props.setSignatureDate(date);
    },
  }),
);

export default enhance(createContractForm);
