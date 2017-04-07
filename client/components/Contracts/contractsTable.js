import _ from 'lodash';
import React, { PropTypes } from 'react';
import ViewContracts from '../../containers/Contracts/ViewContracts';
import { Button, Input, Grid } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';
import ContractFilters from '../../containers/Contracts/ContractsSorting';

const contractsTable = ({
  onAddButtonClick,
  onSearch,
}) => (
  <div>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>
          <ContractFilters />
        </Grid.Column>
        <Grid.Column>
          <Input icon="search" placeholder="Search..." fluid onChange={_.throttle(onSearch, 500)} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <ViewContracts />
    <Button color="brown" style={{ marginTop: '10px' }} onClick={onAddButtonClick}>
      <Translate value="create_new_contract" />
    </Button>
  </div>
);

contractsTable.propTypes = {
  onAddButtonClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default contractsTable;
