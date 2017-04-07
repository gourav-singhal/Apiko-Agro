import _ from 'lodash';
import { connect } from 'react-redux';
import { hideMessage } from './actions';
import { compose, lifecycle } from 'recompose';

import Notificator from '../../components/Notificator';

const mapStateToProps = (state) => ({
  message: state.appMessage,
});

const mapDispatchToProps = (dispatch) => ({
  hideMessage: () => dispatch(hideMessage()),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    shouldComponentUpdate(nextProps) {
      return !_.isEqual(nextProps.message, this.props.message);
    },

    componentDidUpdate() {
      const { message } = this.props;
      if (message && message.isShown) {
        setTimeout(this.props.hideMessage, 6000);
      }
    },
  }),
);

export default enhance(Notificator);
