import { connect } from 'react-redux';
import { header } from './constants';
import { compose, withHandlers, withState, withProps } from 'recompose';
import Table from '../../../components/General/Table';
import _ from 'lodash';
import { sideBarOpenNext } from '../../SideBar/siteBarActions';

const mapStateToProps = state => {
  const { areas, contracts, actions, polygons } = state;
  const areasToBody = areaId => {
    const area = areas.values[areaId];
    const rentContractIds = contracts.keys.find(contractId =>
    contracts.values[contractId].polygonId === area.polygonId);
    const rentContract = rentContractIds && contracts.keys.filter(contractId =>
        _.includes(rentContractIds, contractId));

    const renter = state.renters.values[area.renterId];
    const landlord = state.landlords.values[area.landlordIds[0]];
    const polygon = state.polygons.values[area.polygonId];

    return {
      _id: areaId,
      status: area.status,
      type: area.type,
      actNumber: area.actNumber[0],
      renter: renter && renter.name,
      landlord: landlord && landlord.fullName,
      square: polygon && polygon.square,
      cadastralNumber: polygon && polygon.cadastralNumber,
      rentContract,
    };
  };

  const searchedPolygonIds = polygons.keys.filter(key =>
    polygons.values[key].cadastralNumber.match(
      actions.search.value && `${actions.search.value} *`) || '');
  const filterAreas = areaId => _.includes(searchedPolygonIds, areas.values[areaId].polygonId);

  const body = actions.search.inModel === 'areas' && actions.search.value ?
      areas.keys.filter(filterAreas).map(areasToBody) :
      areas.keys.map(areasToBody);

  return {
    body,
    sideBar: state.sideBar,
    search: state.actions.search.value,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onRowClick: data =>
    sideBarOpenNext('editArea', ownProps.sideBar, dispatch, { selectedItem: data }),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withProps({
    header,
  }),
  withState('currentPage', 'setCurrentPage', 1),
  withHandlers({
    goToPreviousPage: ({ setCurrentPage }) => () => setCurrentPage(n => n - 1),
    goToNextPage: ({ setCurrentPage }) => () => setCurrentPage(n => n + 1),
    goToPage: ({ setCurrentPage }) => (e, result) => setCurrentPage(result.children),
  }),
);

export default enhance(Table);
