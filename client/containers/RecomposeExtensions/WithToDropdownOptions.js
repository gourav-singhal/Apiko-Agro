import _ from 'lodash';
import { withHandlers } from 'recompose';

/**
 * Provide mapping redux model into dropdown options
 *
 * @example
 *         <Dropdown
 *              placeholder={I18n.t('cadastral-number')}
 *              search selection
 *              options={toDropdownOptions(polygons, 'cadastralNumber')}
 *              name="polygonId" />
 *
 />
 * **/
export default () =>
  function decorator(component) {
    return withHandlers({
      toDropdownOptions: props => (collectionName, fieldToDisplay, count) => {
        const collection = _.isString(collectionName) ? props[collectionName] : collectionName;
        const toOptions = key =>
          ({ text: collection.values[key][fieldToDisplay], value: collection.values[key]._id });
        return count ?
          collection.keys.slice(0, count).map(toOptions) :
          collection.keys.map(toOptions);
      },
    })(component);
  };
