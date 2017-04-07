import React, { PropTypes } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../General/FormWarning';

import FormInput from '../General/FormInput';

const Organization = ({
  organization,
  formState,
  getLocalityOptions,
  getExistingLocalities,
  onSubmit,
}) => (
  <Form
    loading={formState.loading}
    error={!!formState.error}
    onSubmit={onSubmit}
  >
    <Form.Field>
      <FormInput
        label={I18n.t('organization_name')}
        name="name"
        placeholder={I18n.t('organization_name')}
        value={organization && organization.name}
        required
      />
      <FormWarning isVisible={formState.warning.name === 'name'} />
    </Form.Field>
    <Form.Field>
      <Form.Dropdown
        label={I18n.t('localities')}
        name="localities"
        options={getLocalityOptions()}
        placeholder={I18n.t('localities')}
        defaultValue={getExistingLocalities()}
        fluid
        multiple
        selection
      />
      <FormWarning isVisible={formState.warning.name === 'localities'} />
    </Form.Field>
    <Message
      error
      header={I18n.t('error')}
      content={formState.error || I18n.t('error_message')}
    />
    <Button color="brown" type="submit">
      <Translate value={organization ? 'update' : 'create'} />
    </Button>
  </Form>
);

Organization.propTypes = {
  formState: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  organization: PropTypes.object,
  getLocalityOptions: PropTypes.func,
  getExistingLocalities: PropTypes.func,
};

export default Organization;
