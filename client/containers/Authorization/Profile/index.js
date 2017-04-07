import { compose } from 'recompose';
import { connect } from 'react-redux';
import UserProfile from '../../../components/Authorization/Profile/UserProfile';

const enhance = compose(
  connect(
    state => ({
      user: state.authorization.user,
    })
  ),
);

export default enhance(UserProfile);
