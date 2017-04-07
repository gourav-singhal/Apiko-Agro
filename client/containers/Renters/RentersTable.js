import { connect } from 'react-redux';
import { compose, withProps, withState, withHandlers } from 'recompose';
import { sideBarOpenNext } from '../SideBar/siteBarActions';

import { tableHeader } from './constants';
import Table from '../../components/General/Table';

const enhance = compose(
  connect(
    ({ renters, sideBar }) => ({
      sideBar,
      body: renters.keys ? renters.keys.map(key => renters.values[key]) : [],
    }),
  ),
  withProps({ header: tableHeader }),
  withState('currentPage', 'setCurrentPage', 1),
  withHandlers({
    onRowClick: ({ sideBar, dispatch }) => renter =>
      sideBarOpenNext('editRenter', sideBar, dispatch, { selectedItem: renter }),
    goToPreviousPage: ({ setCurrentPage }) => () => setCurrentPage(n => n - 1),
    goToNextPage: ({ setCurrentPage }) => () => setCurrentPage(n => n + 1),
    goToPage: ({ setCurrentPage }) => (e, result) => setCurrentPage(result.children),
  }),
);

export default enhance(Table);
