import React, { PropTypes } from 'react';

import { Table, Icon } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

const InnerPolygonsTable = ({ polygons }) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>
          <Translate value="cadastral_number" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Translate value="renter" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Translate value="landlords" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Translate value="contract_number" />
        </Table.HeaderCell>
        <Table.HeaderCell>
          <Translate value="organization_area" />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {polygons.map(polygon =>
        <Table.Row key={polygon._id}>
          <Table.Cell>{polygon.cadastralNumber}</Table.Cell>
          <Table.Cell>{polygon.renterName || '-'}</Table.Cell>
          <Table.Cell>{polygon.landlordName || '-'}</Table.Cell>
          <Table.Cell>{polygon.contractNumber || '-'}</Table.Cell>
          <Table.Cell textAlign="center">
            {polygon.isOrganizationOwner &&
              <Icon className="org-is-owner-icon" name="checkmark" size="large" /> || ''}
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  </Table>
);

InnerPolygonsTable.propTypes = {
  polygons: PropTypes.array.isRequired,
};

export default InnerPolygonsTable;
