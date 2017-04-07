import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Translate } from 'react-i18nify';
import { Button, Grid, Input } from 'semantic-ui-react';
import LandlordsTable from '../../containers/Landlord/LandlordsTable';
import Filter from '../../containers/Landlord/TableFilter';

const Landlords = ({ onSearch, onAddButtonClick }) => (
  <div>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <Filter />
        </Grid.Column>
        <Grid.Column>
          <Input icon="search" placeholder="Search..." fluid onChange={_.throttle(onSearch, 500)} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <LandlordsTable />

    <Button color="brown"onClick={onAddButtonClick} className="create-but-sidebar">
      <Translate value="create_new_landlord" />
    </Button>

  </div>
);

Landlords.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
};
export default Landlords;
