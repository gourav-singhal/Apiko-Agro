import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

import { get, APIAddresses } from '../../utils/api';
import { initRenters } from './actions';
import { showError } from '../Notificator/actions';
import { sideBarOpenNext } from '../SideBar/siteBarActions';
import Renters from '../../components/Renters';

const enhance = compose(
  connect(state => ({
    sideBar: state.sideBar,
  })),
  withHandlers({
    onAddButtonClick: ({ dispatch, sideBar }) => () =>
      sideBarOpenNext('createRenter', sideBar, dispatch),
  }),
  lifecycle({
    componentWillMount() {
      const { dispatch } = this.props;

      get(APIAddresses.RENTERS)
        .then(({ data }) => {
          dispatch(initRenters(data.renters));
        })
        .catch(err => {
          dispatch(showError({
            title: 'error',
            text: err.response.stausText,
          }));
        });
    },
  })
);

export default enhance(Renters);
