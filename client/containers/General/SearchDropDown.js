import _ from 'lodash';
import { withHandlers, withState, compose } from 'recompose';
import SearchDropDown from '../../components/General/SearchDropDown';
import { withToDropdownOptions } from '../RecomposeExtensions';

/**
 * Provide quick search for really big data
 * @props
 *       collection {object} data from store
 *       fieldName {string} field to show
 *       count {number} count element to display
 *
 * @example
 *       <SearchDropDown
 *         count={50}
 *         collection={polygons}
 *         fieldName="cadastralNumber"
 *         placeholder={I18n.t('cadastral-number')}
 *         value={contractData.polygonId}
 *         selection
 *         name="polygonId"
 *        />
 * **/

const enhance = compose(
  withToDropdownOptions(),
  withState('selected', 'setSelected', ({ defaultValue }) => defaultValue || ''),
  withHandlers({
    onChange: props => (e, data) => {
      props.setSelected(data.value);
      return props.onChange && props.onChange(e, data);
    },
    getOptions: props => () => {
      const { selected, collection, fieldName, count } = props;
      const selectedValue = selected || props.value;
      const options = props.toDropdownOptions(props.collection, props.fieldName, count);
      if (selectedValue && !options.find(option => option.value === selectedValue)) {
        options.push({
          text: collection.values[selectedValue][fieldName],
          value: collection.values[selectedValue]._id,
        });
      }
      return options;
    },
    omitProps: props => () =>
      _.omit(props,
        'collection', 'fieldName', 'toDropdownOptions', 'count',
        'onSearch', 'getOptions', 'selected', 'setSelected'),
    onSearch: ({ collection, fieldName, count }) => (options, search) => {
      const searchResult = collection.keys.filter(key =>
        collection.values[key][fieldName].match(`${search}[:\d]*`));

      const mapRes = searchResult.slice(0, count).map(key => ({
        text: collection.values[key][fieldName],
        value: collection.values[key]._id,
      }));
      return mapRes;
    },
  }),
);

export default enhance(SearchDropDown);
