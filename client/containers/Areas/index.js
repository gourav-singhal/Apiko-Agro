import { compose, withHandlers, lifecycle } from 'recompose';
import { connect } from 'react-redux';
import { get, APIAddresses } from '../../utils/api';
import { initAreas } from './AreasTable/actions';
import { config } from '../../utils/FileUploaders/AS3Uploader';
import { initContracts } from '../Contracts/ViewContracts/actions';
import { initLandlords } from '../Landlord/actions';
import { initRenters } from '../Renters/actions';
import { sideBarOpenNext } from '../SideBar/siteBarActions';
import Areas from '../../components/Areas';
import { search } from '../General/Actions/actions';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
    polygons: state.polygons,
  })),
  withHandlers({
    handleNewArea: ({ dispatch, sideBar }) => () =>
      sideBarOpenNext('createNewArea', sideBar, dispatch),
    onSearch: ({ dispatch }) => (e, { value }) => dispatch(search('areas', value)),
  }),
  lifecycle({
    componentWillMount() {
      const { dispatch } = this.props;
      dispatch(search('areas', ''));
      Promise.all([
        get(APIAddresses.LANDLORDS),
        get(APIAddresses.CONTRACT),
        get(APIAddresses.AREAS),
        get(APIAddresses.RENTERS),
        config(),
      ])
        .then(([landlords, contracts, areas, renters]) => {
          dispatch(initLandlords(landlords.data.landlords));
          dispatch(initContracts(contracts.data.contracts));
          dispatch(initAreas(areas.data.areas));
          dispatch(initRenters(renters.data.renters));
        });
    },
  })
);

export default enhance(Areas);
