import React, { PropTypes } from 'react';
import { Table } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

import Row from './Row';
import Pagination from './Pagination';

const CustomTable = ({
  body,
  onRowClick,
  editComponent,
  header,
  search,
  currentPage,
  itemsPerPage = 10,

  goToPage,
  goToNextPage,
  goToPreviousPage,
}) => {
  const pagesCount = Math.ceil(body.length / itemsPerPage);
  const maxItemIndex = currentPage * itemsPerPage;
  const minItemIndex = maxItemIndex - itemsPerPage;
  const currentBody = body.slice(minItemIndex, maxItemIndex);

  return (
    <div>
      <Table celled selectable compact="very">
        <Table.Header>
          <Table.Row>
            {header.map(col => (
              <Table.HeaderCell key={col.title}>
                <Translate value={col.title} />
              </Table.HeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {currentBody.map(row => (
            <Row
              key={row._id}
              data={row}
              header={header}
              onRowClick={onRowClick}
              editComponent={editComponent}
              search={search}
            />
          ))}
        </Table.Body>
        <Pagination
          colsCount={header.length}
          pagesCount={pagesCount}
          activePage={currentPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          goToPage={goToPage}
        />
      </Table>
    </div>
  );
};

CustomTable.propTypes = {
  body: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  tableType: PropTypes.string,
  editComponent: PropTypes.func,
  header: PropTypes.array.isRequired,
  search: PropTypes.string,

  currentPage: PropTypes.number,
  itemsPerPage: PropTypes.number,

  goToPage: PropTypes.func,
  goToNextPage: PropTypes.func,
  goToPreviousPage: PropTypes.func,
};

export default CustomTable;
