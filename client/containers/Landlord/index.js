import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

import { config } from '../../utils/FileUploaders/AS3Uploader';
import { search } from '../General/Actions/actions';
import { sideBarOpenNext } from '../SideBar/siteBarActions';
import Landlords from '../../components/Landlord';

const enhance = compose(
  connect(
    state => ({
      landlords: state.landlords,
      sideBar: state.sideBar,
    })
  ),
  withHandlers({
    onAddButtonClick: ({ sideBar, dispatch }) => () =>
      sideBarOpenNext('createLandlord', sideBar, dispatch),
    onSearch: ({ dispatch }) => (e, { value }) => dispatch(search('landlords', value)),
  }),
  lifecycle({
    componentWillMount() {
      this.props.dispatch(search('landlords', ''));
      config();
    },
  }),
);

export default enhance(Landlords);
