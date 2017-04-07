import React, { PropTypes } from 'react';

import { Button, Form, Message, Input } from 'semantic-ui-react';
import { I18n, Translate } from 'react-i18nify';
import FormWarning from '../General/FormWarning';

const CreateDepartmentForm = ({
  onSubmit,
  getLocalityOptions,
  formState,
  onChangeDropdown,
  dropdownState,
}) => (
  <Form
    loading={formState.loading}
    onSubmit={onSubmit}
  >

    <Form.Field>
      <Form.Input
        label={I18n.t('name')}
        name="name"
        placeholder={I18n.t('name')}
        required
      />
      <FormWarning isVisible={formState.warning.name === 'name'} />
    </Form.Field>
    <Form.Field>
      <Form.Dropdown
        label={I18n.t('villages')}
        name="localities"
        placeholder={I18n.t('chose_villages')}
        options={getLocalityOptions() || []}
        value={dropdownState}
        onChange={onChangeDropdown}
        fluid
        multiple
        selection
      />
      <FormWarning isVisible={formState.warning.name === 'localities'} />
    </Form.Field>
    <Message
      error
      header={I18n.t('error')}
      visible={!!formState.error}
      content={formState.error ? I18n.t(formState.error) : ''}
    />
    <Button color="brown" type="submit">
      <Translate value="create" />
    </Button>
  </Form>
);

CreateDepartmentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  allVillages: PropTypes.array,
  getLocalityOptions: PropTypes.func,
  onChangeDropdown: PropTypes.func,
  dropdownState: PropTypes.array,
  formState: PropTypes.object.isRequired,
};

export default CreateDepartmentForm;
