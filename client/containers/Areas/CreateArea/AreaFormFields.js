import _ from 'lodash';
import { withHandlers, compose, withProps } from 'recompose';
import { connect } from 'react-redux';
import AreaFormFields from '../../../components/Areas/AreaFormFields';
import { withToDropdownOptions } from '../../RecomposeExtensions';
import { sideBarOpenNext, sideBarOpenPrevious } from '../../SideBar/siteBarActions';

import {
  dropdawnProps,
  contractsToOptions,
  localitiesToOptions,
  onCadastralNumberChanged,
  areaSquare,
} from './form-helpers';

const getFormFieldsValue = (form) => {
  const fieldsList = ['status', 'cadastralNumber', 'type', 'actNumber',
    'localityId', 'landlordIds', 'renterId', 'contractId', 'comment', 'polygonId'];
  const formData = {};
  _.each(fieldsList, fieldName => {
    if (form[fieldName]) {
      formData[fieldName] = form[fieldName].value;
    }
  });
  return formData;
};

const mapStateToProps = (state) => {
  const areaId = _.get(state, 'sideBar.data.selectedItem._id');
  const area = state.areas.values[areaId];
  return {
    polygons: state.polygons,
    activePolygon: area && area.polygonId || state.activePolygon,
    localities: state.localities,
    landlords: state.landlords,
    contracts: state.contracts,
    renters: state.renters,
    sideBar: state.sideBar,
    currentArea: state.sideBar.data.formData || area || {},
  };
};

const enhance = compose(
  connect(
    mapStateToProps,
  ),
  withToDropdownOptions(),
  withProps(dropdawnProps),
  withHandlers({
    contractsToOptions,
    localitiesToOptions,
    onCadastralNumberChanged,
    areaSquare,
    onAddButtonClick: props => (pathName, payload) => (event) => {
      const { data } = props.sideBar;
      const formData = getFormFieldsValue(event.target.form || event.target.parentElement.form);
      sideBarOpenNext(pathName, props.sideBar, props.dispatch, { ...data, ...payload, formData });
    },
    onNewRenterAdd: ({ dispatch }) => (renter, sideBar) => {
      const { data } = sideBar;
      data.formData.renterId = renter._id;
      sideBarOpenPrevious(sideBar, dispatch, data);
    },
    onNewLandlordAdd: ({ dispatch }) => (landlord, sideBar) => {
      const { data } = sideBar;
      data.formData.landlordIds = landlord._id;
      sideBarOpenPrevious(sideBar, dispatch, data);
    },
    onNewContractAdd: ({ dispatch }) => (contract, sideBar) => {
      const { data } = sideBar;
      data.formData.contractId = contract._id;
      sideBarOpenPrevious(sideBar, dispatch, data);
    },
  })
);

export default enhance(AreaFormFields);
