import React, { PropTypes } from 'react';
import { Table, Modal } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

const Row = ({
  data,
  header,
  editComponent,
  onRowClick,
  search,
}) => {
  const row = (
    <Table.Row onClick={() => onRowClick && onRowClick(data, data.id)} >
      {header.map(col => {
        const value = data[col.propName || col.title] || '';
        const isPositive = search && String(value).match(`${search} *`) || false;
        return (
          <Table.Cell key={col.title} positive={!!isPositive}>
            {typeof value === 'number' ? String(value) : <Translate value={String(value)} />}
          </Table.Cell>
          );
      })}
    </Table.Row>
  );

  if (editComponent) {
    const EditComponent = editComponent;

    return (
      <Modal trigger={row}>
        <Modal.Content>
          <Modal.Description>
            <EditComponent data={data} />
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
  return row;
};

Row.propTypes = {
  header: PropTypes.array,
  data: PropTypes.object,
  editComponent: PropTypes.func,
  onRowClick: PropTypes.func,
  search: PropTypes.string,
};

export default Row;
