import React, { PropTypes } from 'react';
import { Table, Form, Button, Message, Confirm, Input } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import SearchDropDown from '../../containers/General/SearchDropDown';
import FormWarning from '../General/FormWarning';

import './editContractForm.scss';
import 'react-datepicker/dist/react-datepicker.css';

const ContractsModal = ({
  contract,
  registrationDate,
  signatureDate,
  onRegistrationDatePick,
  onSignatureDatePick,
  onSave,
  onDelete,
  confirmModal,
  openConfirm,
  closeConfirm,
  polygons,
  formState,
}) => (
  <Form
    onSubmit={onSave}
    className="new-contract-table"
    loading={formState.loading}
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
                value={contract.polygonId}
                count={50}
                selection
                name="polygonId"
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
              <Input
                name="extract"
                required defaultValue={contract.extract}
              />
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
              <Input
                name="registrationNumber"
                required defaultValue={contract.registrationNumber}
              />
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
              placeholderText="Click to select a date"
              onChange={onRegistrationDatePick}
              selected={registrationDate || moment(contract.registrationDate)}
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
              <Input
                name="validity"
                required
                type="number"
                defaultValue={contract.validity}
              />
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
              placeholderText="Click to select a date"
              onChange={onSignatureDatePick}
              selected={signatureDate || moment(contract.signatureDate)}
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
        <Translate value="save_changes" />
      </Button>
      <Button color="red" onClick={openConfirm}>
        <Translate value="delete_contract" />
      </Button>

      <Confirm
        open={confirmModal}
        onCancel={closeConfirm}
        onConfirm={onDelete}
        content={I18n.t('delete_contract_confirm_text')}
        cancelButton={I18n.t('no')}
        confirmButton={I18n.t('yes')}
      />

      <Message
        error
        header={I18n.t('error')}
        content={!!formState.error && formState.error.message || I18n.t('error_message')}
      />
    </div>
  </Form>
);


ContractsModal.propTypes = {
  contract: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  openConfirm: PropTypes.func.isRequired,
  closeConfirm: PropTypes.func.isRequired,
  onRegistrationDatePick: PropTypes.func.isRequired,
  onSignatureDatePick: PropTypes.func.isRequired,
  polygons: PropTypes.object.isRequired,
  confirmModal: PropTypes.bool.isRequired,
  registrationDate: PropTypes.object,
  signatureDate: PropTypes.object,
  formState: PropTypes.object.isRequired,
};

export default ContractsModal;
