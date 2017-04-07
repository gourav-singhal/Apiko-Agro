import React, { PropTypes } from 'react';
import { Card, Table, Form, Button, Input, Message } from 'semantic-ui-react';
import { I18n, Translate } from 'react-i18nify';
import SearchDropDown from '../../containers/General/SearchDropDown';
import DatePicker from 'react-datepicker';
import FormWarning from '../General/FormWarning';

import './createContractForm.scss';
import 'react-datepicker/dist/react-datepicker.css';


const newContract = ({
  onSubmit,
  onRegistrationDatePick,
  onSignatureDatePick,
  registrationDate,
  signatureDate,
  polygons,
  selectedPolygonId,
  formState,
}) => (
  <Card fluid>
    <Form
      onSubmit={onSubmit}
      className="new-contract-table"
      loading={formState.loading}
      error={!!formState.error}
    >
      <Table definition compact>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Translate value="cadastral_number" />
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <SearchDropDown
                  placeholder={I18n.t('cadastral-number')}
                  collection={polygons}
                  fieldName="cadastralNumber"
                  count={50}
                  selection
                  value={selectedPolygonId}
                  name="polygonId"
                  disabled={!!selectedPolygonId}
                />
                <FormWarning isVisible={formState.warning.name === 'polygonId'} />
              </Form.Field>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Translate value="extract" />
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <Input name="extract" required />
                <FormWarning isVisible={formState.warning.name === 'extract'} />
              </Form.Field>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Translate value="registration_number" />
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <Input name="registrationNumber" required />
                <FormWarning isVisible={formState.warning.name === 'registrationNumber'} />
              </Form.Field>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Translate value="registration_date" />
            </Table.Cell>
            <Table.Cell>
              <DatePicker
                className="datepicker"
                placeholderText={I18n.t('select_date')}
                onChange={onRegistrationDatePick}
                selected={registrationDate}
                locale="uk"
                name="registrationDate"
                showYearDropdown
                popoverAttachment="bottom center"
                popoverTargetAttachment="bottom center"
              />
              <FormWarning isVisible={formState.warning.name === 'registrationDate'} />
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Translate value="validity" />
            </Table.Cell>
            <Table.Cell>
              <Form.Field>
                <Input name="validity" type="number" required />
                <FormWarning isVisible={formState.warning.name === 'validity'} />
                <FormWarning
                  isVisible={formState.warning.name === 'validity-range'}
                  message={I18n.t('range-error-message', { from: 1, to: 100 })}
                />
              </Form.Field>
            </Table.Cell>
          </Table.Row>

          <Table.Row>
            <Table.Cell>
              <Translate value="contract_signing_date" />
            </Table.Cell>
            <Table.Cell>
              <DatePicker
                className="datepicker"
                placeholderText={I18n.t('select_date')}
                onChange={onSignatureDatePick}
                selected={signatureDate}
                locale="uk"
                name="signatureDate"
                showYearDropdown
                popoverAttachment="bottom center"
                popoverTargetAttachment="bottom center"
              />
              <FormWarning isVisible={formState.warning.name === 'signatureDate'} />
            </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>

      <div className="create-button-container">
        <Button color="brown" type="submit">
          <Translate value="create" />
        </Button>
      </div>

      <Message
        error
        header={I18n.t('error')}
        content={formState.error || I18n.t('error_message')}
      />
    </Form>
  </Card>);

newContract.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  polygons: PropTypes.object.isRequired,
  onRegistrationDatePick: PropTypes.func,
  onSignatureDatePick: PropTypes.func,
  registrationDate: PropTypes.object,
  signatureDate: PropTypes.object,
  selectedPolygonId: PropTypes.string,
  formState: PropTypes.object.isRequired,
};

export default newContract;
