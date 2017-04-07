import React, { PropTypes } from 'react';
import { Button } from 'semantic-ui-react';
import RentersTable from '../../containers/Renters/RentersTable';
import { Translate } from 'react-i18nify';

const Renters = ({ onAddButtonClick }) => (
  <div>
    <Button onClick={onAddButtonClick} color="brown" className="create-but-sidebar">
      <Translate value="new_renter" />
    </Button>
    <RentersTable />
  </div>
);

Renters.propTypes = {
  onAddButtonClick: PropTypes.func.isRequired,
};

export default Renters;
