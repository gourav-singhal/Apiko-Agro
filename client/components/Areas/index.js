import _ from 'lodash';
import React, { PropTypes } from 'react';
import AreasTable from '../../containers/Areas/AreasTable';
import { Translate } from 'react-i18nify';
import { Grid, Button, Input } from 'semantic-ui-react';

const Areas = ({
  handleNewArea,
  sideBar,
  onSearch,
}) => (
  <div>
    <Grid divided="vertically">
      <Grid.Row columns={2}>
        <Grid.Column>

        </Grid.Column>
        <Grid.Column>
          <Input icon="search" placeholder="Search..." fluid onChange={_.throttle(onSearch, 500)} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <AreasTable sideBar={sideBar} />
    <div>
      <Button color="brown" style={{ marginTop: '10px' }} onClick={() => handleNewArea()}>
        <Translate value="create_new_area" />
      </Button>
    </div>
  </div>
);

Areas.propTypes = {
  handleNewArea: PropTypes.func.isRequired,
  sideBar: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Areas;
