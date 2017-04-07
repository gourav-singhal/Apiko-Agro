import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle } from 'recompose';
import { onCloseSideBar, sideBarOpen, sideBarOpenCurrent } from './siteBarActions';
import { browserHistory } from 'react-router';

import SideBar from '../../components/SideBar';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
    routing: state.routing,
  })),
  withHandlers({
    onSelectMenuItem: ({ sideBar, dispatch }) => menuItemName => {
      sideBarOpen(menuItemName, sideBar, dispatch);
      browserHistory.push({
        pathname: '/',
        query: { sidebar: menuItemName },
      });
    },
    openSideBar: ({ sideBar, dispatch }) => menuItemName =>
      sideBarOpen(menuItemName, sideBar, dispatch),
    onNavigationItemClick: ({ sideBar, dispatch }) => pathName => () =>
      sideBarOpenCurrent(pathName, sideBar, dispatch),
    onCloseSideBar: ({ dispatch }) => () => {
      browserHistory.push({
        pathname: '/',
        query: {},
      });
      onCloseSideBar(dispatch);
    },
    handleResize: () => (diff, element) => {
      const minWidth = 260;
      const resizableBlockStyle = element.style;
      const newWidth = +resizableBlockStyle.width.slice(0, -2) + diff;
      if (newWidth < minWidth) {
        return;
      }
      resizableBlockStyle.width = `${newWidth}px`;
    },
  }),
  lifecycle({
    componentWillMount() {
      const menuItemName = this.props.routing.locationBeforeTransitions.query.sidebar;
      if (menuItemName) {
        this.props.openSideBar(menuItemName, this.props.sideBar);
      }
    },
  }),
);

export default enhance(SideBar);
