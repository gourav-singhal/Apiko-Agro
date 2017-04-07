import { connect } from 'react-redux';
import { header } from './constants';
import { compose, withHandlers, withState, withProps } from 'recompose';
import Table from '../../components/General/Table';
import { sideBarOpenNext } from '../SideBar/siteBarActions';

const getFilteredBody = (landlords, filter, search) => {
  const modelName = 'landlords';
  const action = {
    filter: filter.inModel === modelName && filter.filters || [],
    search: filter.inModel === modelName && `${search.value} *` || '',
  };

  const findMatches = fields => landlord =>
    fields.find(fieldName => {
      const field = landlord[fieldName];
      return field && field.match(action.search);
    });

  const filterMatches = landlord =>
    landlord[action.filter[0].byField] === action.filter[0].withValue;

  const landlordsArray = landlords.keys.map(key => landlords.values[key]);

  let result = landlordsArray;
  if (action.filter[0].withValue !== 'all') {
    result = result.filter(filterMatches);
  }
  if (action.search) {
    result = result.filter(
      findMatches(['fullName', 'address', 'passportDetails', 'personalId', 'phoneNumber']));
  }
  return result;
};

const mapStateToProps = state => ({
  body: getFilteredBody(state.landlords, state.actions.filter, state.actions.search),
  search: state.actions.search.value,
  sideBar: state.sideBar,
});

const enhance = compose(
  connect(mapStateToProps),
  withProps({ header }),
  withState('currentPage', 'setCurrentPage', 1),
  withHandlers({
    onRowClick: ({ dispatch, sideBar }) => (landlord) =>
      sideBarOpenNext('editLandlord', sideBar, dispatch, { selectedItem: landlord }),
    goToPage: ({ setCurrentPage }) => (e, result) => setCurrentPage(result.children),
    goToNextPage: ({ setCurrentPage }) => () => setCurrentPage(n => n + 1),
    goToPreviousPage: ({ setCurrentPage }) => () => setCurrentPage(n => n - 1),
  }),
);

export default enhance(Table);
