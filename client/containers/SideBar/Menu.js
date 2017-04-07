import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import Menu from '../../components/SideBar/Menu';
import { handleMenuAction } from './siteBarActions';
import { withPermissionChecker } from '../../containers/RecomposeExtensions';

const handleSelectMenuItem = ({
  onSelectMenuItem,
  sideBar,
  dispatch,
}) => (e, { name, action }) => {
  if (name === sideBar.activePath && sideBar.isActive) {
    return;
  }
  if (handleMenuAction(action, dispatch)) {
    return;
  }
  onSelectMenuItem(name);
};

const enhance = compose(
  connect(
    state => ({
      user: state.authorization.user,
    })
  ),
  withPermissionChecker,
  withHandlers({ handleSelectMenuItem }),
);

export default enhance(Menu);
