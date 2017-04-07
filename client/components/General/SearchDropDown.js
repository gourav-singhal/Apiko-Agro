import React, { PropTypes } from 'react';
import { Dropdown } from 'semantic-ui-react';

const SearchDropDown = props => (
  <Dropdown
    {...props.omitProps()}
    options={props.getOptions()}
    search={props.onSearch}
    onChange={props.onChange}
  />
);

SearchDropDown.propTypes = {
  omitProps: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchDropDown;
