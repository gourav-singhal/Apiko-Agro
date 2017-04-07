import React, { PropTypes } from 'react';
import { Form, Button, Dropdown, TextArea } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import ReaciveInput from '../General/Input';
import FormWarning from '../General/FormWarning';
import SearchDropDown from '../../containers/General/SearchDropDown';

const AreaFormFields = ({
  formState,
  activePolygon,
  types,
  toDropdownOptions,
  polygons,
  localitiesToOptions,
  onCadastralNumberChanged,
  contractsToOptions,
  onAddButtonClick,
  onNewRenterAdd,
  onNewLandlordAdd,
  onNewContractAdd,
  statuses,
  areaSquare,
  currentArea,
}) =>
  <div>
    <Form.Field>
      <label><Translate value="cadastral-number" /></label>
      <SearchDropDown
        placeholder={I18n.t('cadastral-number')}
        collection={polygons}
        fieldName="cadastralNumber"
        count={50}
        selection
        onChange={onCadastralNumberChanged}
        value={currentArea.polygonId || activePolygon || ''}
        name="polygonId"
      />
      <FormWarning isVisible={formState.warning.name === 'polygonId'} />
    </Form.Field>

    <Form.Field>
      <label><Translate value="square" /></label>
      <ReaciveInput
        label={{ basic: true, content: I18n.t('hectare') }}
        labelPosition="right"
        disabled
        value={areaSquare()}
        name="square"
      />
    </Form.Field>

    <Form.Field>
      <Form.Select
        defaultValue={currentArea.type}
        required
        label={I18n.t('type')}
        name="type"
        options={types}
      />
      <FormWarning isVisible={formState.warning.name === 'type'} />
    </Form.Field>

    <Form.Field>
      <Form.Select
        defaultValue={currentArea.status}
        label={I18n.t('status')}
        name="status"
        options={statuses}
        required
      />
      <FormWarning isVisible={formState.warning.name === 'status'} />
    </Form.Field>

    <Form.Field>
      <Form.Input
        defaultValue={currentArea.actNumber}
        label={I18n.t('act_number')}
        name="actNumber"
        required
      />
      <FormWarning isVisible={formState.warning.name === 'actNumber'} />
    </Form.Field>

    <Form.Field>
      <label><Translate value="localities" /></label>
      <Dropdown
        defaultValue={currentArea.localityId}
        placeholder={I18n.t('localities')}
        search selection
        options={localitiesToOptions()}
        name="localityId"
      />
      <FormWarning isVisible={formState.warning.name === 'localityId'} />
    </Form.Field>
    <Form.Field>
      <label>
        <Translate value="landlord" />
        <Button
          type="button"
          onClick={onAddButtonClick('createLandlord', { onNewLandlordAdd })}
          circular basic icon="plus"
          color="blue"
          floated="right"
        />
      </label>
      <Dropdown
        defaultValue={currentArea.landlordIds}
        placeholder={I18n.t('landlords')}
        search selection multiple
        options={toDropdownOptions('landlords', 'fullName')}
        name="landlordIds"
      />
      <FormWarning isVisible={formState.warning.name === 'landlordIds'} />
    </Form.Field>

    <Form.Field>
      <label>
        <Translate value="renters" />
        <Button
          type="button"
          onClick={onAddButtonClick('createRenter', { onNewRenterAdd })}
          circular basic icon="plus"
          color="blue"
          floated="right"
        />
      </label>
      <Dropdown
        defaultValue={currentArea.renterId}
        placeholder={I18n.t('renters')}
        search selection
        options={toDropdownOptions('renters', 'name')}
        name="renterId"
      />
      <FormWarning isVisible={formState.warning.name === 'renterId'} />
    </Form.Field>

    <Form.Field>
      <label>
        <Translate value="rent_contract" />
        <Button
          type="button"
          onClick={onAddButtonClick('createContract', { onNewContractAdd })}
          circular basic icon="plus"
          color="blue"
          floated="right"
        />
      </label>
      <Dropdown
        defaultValue={currentArea.contractId}
        placeholder={I18n.t('rent_contract')}
        search selection
        options={contractsToOptions('extract')}
        name="contractId"
      />
      <FormWarning isVisible={formState.warning.name === 'contractId'} />
    </Form.Field>

    <Form.Field
      defaultValue={currentArea.comment}
      control={TextArea}
      label={I18n.t('comment')}
      name="comment"
    />

    <Form.Field>
      <label><Translate value="file" /></label>
      <input type="file" name="file" multiple />
    </Form.Field>
  </div>;

AreaFormFields.propTypes = {
  activePolygon: PropTypes.string,
  statuses: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  toDropdownOptions: PropTypes.func.isRequired,
  localitiesToOptions: PropTypes.func.isRequired,
  contractsToOptions: PropTypes.func.isRequired,
  onCadastralNumberChanged: PropTypes.func.isRequired,
  areaSquare: PropTypes.func.isRequired,
  polygons: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
  onAddButtonClick: PropTypes.func.isRequired,
  onNewRenterAdd: PropTypes.func.isRequired,
  onNewLandlordAdd: PropTypes.func.isRequired,
  onNewContractAdd: PropTypes.func.isRequired,
  currentArea: PropTypes.object.isRequired,
};

export default AreaFormFields;
