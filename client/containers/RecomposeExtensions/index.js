import withSetState from './WithSetState';
import withPermissionChecker from './withPermissionChecker';
import withToDropdownOptions from './WithToDropdownOptions';

/**
 * Here placed all Recompose Extensions
 *
 * @example
 *         import { withSomeExtensions } from '../RecomposeExtensions'
 *
 *         const enhance = compose(
 *           connect(state => ...),
 *           withSomeExtensions(...params),
 *          );
 * **/

export {
  withSetState,
  withPermissionChecker,
  withToDropdownOptions,
};
