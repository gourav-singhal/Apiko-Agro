import { compose, withHandlers, lifecycle } from 'recompose';
import { get, APIAddresses } from '../../utils/api';
import { connect } from 'react-redux';
import { initContracts } from '../Contracts/ViewContracts/actions';
import { search } from '../General/Actions/actions';
import contractsTable from '../../components/Contracts/contractsTable';
import { sideBarOpenNext } from '../SideBar/siteBarActions';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
  })),
  withHandlers({
    onAddButtonClick: ({ sideBar, dispatch }) => () =>
      sideBarOpenNext('createContract', sideBar, dispatch),
    onSearch: ({ dispatch }) => (e, { value }) => dispatch(search('contracts', value)),
  }),
  lifecycle({
    componentWillMount() {
      const { dispatch } = this.props;
      dispatch(search('contracts', ''));
      get(APIAddresses.CONTRACT)
        .then((contracts) => dispatch(initContracts(contracts.data.contracts)));
    },
  })
);

export default enhance(contractsTable);
