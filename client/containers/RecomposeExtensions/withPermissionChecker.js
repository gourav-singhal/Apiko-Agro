import { withHandlers } from 'recompose';

/**
 * Provide easy way to check user permissions
 *
 * **/

export default withHandlers({
  hasInvitePermission: props => () => props.user.roles.includes('owner'),
});
