import React, { PropTypes } from 'react';
import { Card, Icon } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';

const FieldInfoCard = ({
  field,
  fieldLocality,
  onClickEdit,
}) => (
  <Card>
    <Card.Content>
      <Icon name="edit" className="right floated" onClick={onClickEdit} link />
      <div
        className="right floated"
        style={{ backgroundColor: field.color, width: '35px', height: '11px' }}
      >
      </div>
      <Card.Header>
        {field.name}
      </Card.Header>
      <Card.Meta>
        <Translate value="square" />:{field.square} <Translate value="hectars" />
      </Card.Meta>
      <Card.Description>
        {fieldLocality.formattedAddress}
      </Card.Description>
    </Card.Content>
  </Card>
);

FieldInfoCard.propTypes = {
  field: PropTypes.object.isRequired,
  fieldLocality: PropTypes.object.isRequired,
  onClickEdit: PropTypes.func.isRequired,
};

export default FieldInfoCard;
