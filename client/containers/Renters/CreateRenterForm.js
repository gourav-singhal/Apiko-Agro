import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, withHandlers, withProps, withState } from 'recompose';

import RenterForm from '../../components/Renters/RenterForm';
import { post, APIAddresses } from '../../utils/api';
import { pushRenter } from './actions';

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

const onSubmit = props => (e, { formData }) => {
  e.preventDefault();

  if (!isFormValid(formData, props)) {
    return;
  }

  const { dispatch, changeFormState, formState } = props;
  const target = e.target;

  changeFormState({ ...formState, loading: true });
  post(APIAddresses.RENTERS, formData)
    .then(({ data }) => {
      dispatch(pushRenter({ ...formData, _id: data._id }));
      dispatch(showSuccess('success', 'renter_created'));
      target.reset();
      const onNewRenterAdd = _.get(props, 'sideBar.data.onNewRenterAdd');
      if (onNewRenterAdd) {
        onNewRenterAdd(data, _.get(props, 'sideBar'));
      } else {
        sideBarOpenPrevious(props.sideBar, dispatch);
      }
    })
    .catch(err => changeFormState({ ...DEFAULT_FORM_STATE, error: err.response.statusText }));
};

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
  })),
  withState('formState', 'changeFormState', DEFAULT_FORM_STATE),
  withProps({ isCreating: true }),
  withHandlers({
    onSubmit,
  }),
);

export default enhance(RenterForm);
