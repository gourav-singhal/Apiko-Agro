import { connect } from 'react-redux';
import { header, modalType } from './constants';
import { compose, withHandlers, withState, withProps } from 'recompose';
import { sideBarOpenNext } from '../../SideBar/siteBarActions';
import Table from '../../../components/General/Table';
import moment from 'moment';

const stringToDate = (str) => new Date(Date.parse(str));

const formatDateString = (str) => new Date(Date.parse(str)).toLocaleDateString();

const sortContracts = (contracts, actions) =>
  actions.sort.sortBy === 'expire_soon' && contracts.sort(
      (a, b) => Date.parse(a.expirationDate) - Date.parse(b.expirationDate)
    ) || contracts;

const filterContracts = (contracts, actions) => {
  const fieldsToSearch = ['cadastralNumber', 'registrationNumber', 'extract'];
  const filterFields = contract =>
    fieldsToSearch.find(fieldName => contract[fieldName].match(`${actions.search.value} *`));
  return actions.search.inModel === 'contracts' && actions.search.value &&
    contracts.filter(filterFields) || contracts;
};

const mapStateToProps = state => {
  const { actions, contracts, polygons, sideBar } = state;
  const contractList = contracts.keys.map(key => contracts.values[key]).map(contract => {
    const biggerDate =
      stringToDate(contract.registrationDate) >=
      stringToDate(contract.signatureDate) ?
      contract.registrationDate : contract.signatureDate;
    return {
      ...contract,
      expirationDate: moment(stringToDate(biggerDate))
        .add(contract.validity, 'year')
        .toDate()
        .toLocaleDateString(),
      registrationDate: formatDateString(contract.registrationDate),
      signatureDate: formatDateString(contract.signatureDate),
      cadastralNumber: polygons.values[contract.polygonId] &&
        polygons.values[contract.polygonId].cadastralNumber || '',
    }; });

  return {
    sideBar,
    body: sortContracts(filterContracts(contractList, actions), actions),
    search: actions.search.value,
  };
};

const enhance = compose(
  connect(mapStateToProps),
  withProps({
    header,
    tableType: modalType,
  }),
  withState('currentPage', 'setCurrentPage', 1),
  withHandlers({
    onRowClick: ({ dispatch, sideBar }) => (contract) =>
      sideBarOpenNext('editContract', sideBar, dispatch, { selectedItem: contract }),
    goToPreviousPage: ({ setCurrentPage }) => () => setCurrentPage(n => n - 1),
    goToNextPage: ({ setCurrentPage }) => () => setCurrentPage(n => n + 1),
    goToPage: ({ setCurrentPage }) => (e, result) => setCurrentPage(result.children),
  }),
);

export default enhance(Table);
