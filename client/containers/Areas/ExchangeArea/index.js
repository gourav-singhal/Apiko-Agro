import { withHandlers, withState, compose } from 'recompose';
import { connect } from 'react-redux';
import { post, APIAddresses } from '../../../utils/api/';
import { showSuccess } from '../../Notificator/actions';
import ExchangeAreaForm from '../../../components/Areas/ExchangeAreaForm';
import { withToDropdownOptions } from '../../RecomposeExtensions';
import { DEFAULT_FORM_STATE, isFormValid } from '../CreateArea/form-validation';
import { sideBarOpenNext } from '../../SideBar/siteBarActions';

const getRenterArea = ({ areas }) => (renterId) => {
  const areaId = areas.keys.find(key =>
  areas.values[key].renterId === renterId);
  return areas.values[areaId];
};

const enhance = compose(
  connect(state => ({
    currentArea: state.sideBar.data,
    renters: state.renters,
    polygons: state.polygons,
    areas: state.areas,
    sideBar: state.sideBar,
  })),
  withToDropdownOptions(),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withState('selectedRenterId', 'setSelectedRenterId', ''),
  withState('dateOfExchange', 'setDateOfExchange', null),
  withHandlers({
    getAreaCadastralNumber: ({ polygons }) => (area) => {
      const polygon = polygons.values[area && area.polygonId];
      return polygon && polygon.cadastralNumber;
    },
    getRenterArea,
    getAreaRenterName: ({ renters }) => (renterId) => {
      const renter = renters.values[renterId];
      return renter && renter.name;
    },
    filterRenters: ({ currentArea, areas }) => rentersOptions =>
      rentersOptions.filter(({ value }) => {
        const renterAreaId = areas.keys.find(key => areas.values[key].renterId === value);
        return renterAreaId && currentArea._id !== renterAreaId;
      }),
    onRenterChange: props => (e, { value }) => props.setSelectedRenterId(value),
    onDatePick: props => date => props.setDateOfExchange(date),

    onSubmit: props => (e, { formData }) => {
      e.preventDefault();
      const target = e.target;

      if (!isFormValid(formData, props)) {
        return false;
      }

      const exchangeAct = {
        firstAreaId: props.currentArea._id,
        secondAreaId: getRenterArea(props)(formData.renterId)._id,
        firstRenterId: props.renters.values[props.currentArea.renterId]._id,
        secondRenterId: formData.renterId,
        dateOfExchange: props.dateOfExchange.toDate().toISOString(),
        expiration: parseInt(formData.expiration, 10),
      };

      props.setFormState({ ...DEFAULT_FORM_STATE, loading: true });
      return post(APIAddresses.EXCHANGE_ACTS, exchangeAct)
        .then(() => {
          props.dispatch(showSuccess('success', 'exchange-act-created'));
          target.reset();
          sideBarOpenNext('areas', props.sideBar, props.dispatch);
        })
        .catch(err => {
          props.setFormState({ ...DEFAULT_FORM_STATE,
            error: err.response.data.message || err.response.statusText });
        });
    },
  })
);

export default enhance(ExchangeAreaForm);
