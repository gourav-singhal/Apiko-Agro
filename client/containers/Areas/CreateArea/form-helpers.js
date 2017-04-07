import { I18n } from 'react-i18nify';
import { setMapCenterFor } from '../../Map/actions';
import { activatePolygon } from '../../../containers/Polygons/actions';

const dropdawnProps = {
  types: [{
    text: I18n.t('share'),
    value: 'share',
  }, {
    text: I18n.t('area'),
    value: 'area',
  }, {
    text: I18n.t('not-defined-area'),
    value: 'notDefinedArea',
  }],
  statuses: [{
    text: I18n.t('registered'),
    value: 'registered',
  }, {
    text: I18n.t('in-register'),
    value: 'inRegister',
  }],
};

const contractsToOptions = props => fieldToDisplay =>
  props.toDropdownOptions('contracts', fieldToDisplay).filter(option => {
    const contract = props.contracts.values[option.value];
    return contract && contract.polygonId === props.activePolygon;
  });

const localitiesToOptions = ({ localities }) => () => localities.map(locally =>
  ({ text: locally.formattedAddress, value: locally._id }));

const onCadastralNumberChanged = props => (e, { value }) => {
  props.dispatch(activatePolygon(value));
  const polygon = props.polygons.values[value];
  props.dispatch(setMapCenterFor(polygon.coordinates[0], 15));
};

const areaSquare = ({ polygons, activePolygon }) => () =>
  polygons.values[activePolygon] && polygons.values[activePolygon].square;

export {
  dropdawnProps,
  contractsToOptions,
  localitiesToOptions,
  onCadastralNumberChanged,
  areaSquare,
};
