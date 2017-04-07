import React, { PropTypes } from 'react';

import { Button, Form, Message, Input, Confirm } from 'semantic-ui-react';
import { I18n, Translate } from 'react-i18nify';
import Visible from '../General/Visible';
import FormWarning from '../General/FormWarning';

const RenterForm = ({
  onSubmit,
  formState,
  onRemove,
  renter,
  isCreating,
  isOpenConfirm,
  setConfirm,
}) => (
  <Form
    onSubmit={onSubmit}
    loading={formState.loading}
    error={!!formState.error}
  >
    <Form.Field>
      <Form.Input
        label={I18n.t('name')}
        name="name"
        defaultValue={!isCreating ? renter.name : ''}
        placeholder={I18n.t('name')}
        required
      />
      <FormWarning isVisible={formState.warning.name === 'name'} />
    </Form.Field>
    <Form.Checkbox
      name="isParticipiant"
      label={I18n.t('organiztion_renter')}
      defaultChecked={!isCreating ? renter.isParticipiant : false}
    />

    <Message
      error
      header={I18n.t('error')}
      visible={!!formState.error}
      content={formState.error ? I18n.t(formState.error) : ''}
    />
    <Message
      success
      header={I18n.t('success')}
      visible={!!formState.success}
      content={formState.success ? I18n.t(formState.success) : ''}
    />
    <Button color="brown" type="submit">
      <Translate value={isCreating ? 'create' : 'update'} />
    </Button>
    <Visible isVisible={!isCreating}>
      <span>
        <Button
          secondary
          type="button"
          onClick={() => setConfirm(true)}
        >
          <Translate value="remove" />
        </Button>
        <Confirm
          open={isOpenConfirm}
          onCancel={() => setConfirm(false)}
          onConfirm={onRemove}
          content={I18n.t('confirm_text')}
          cancelButton={I18n.t('no')}
          confirmButton={I18n.t('yes')}
        />
      </span>
    </Visible>
  </Form>
);

RenterForm.propTypes = {
  isOpenConfirm: PropTypes.bool,
  setConfirm: PropTypes.func,
  isCreating: PropTypes.bool,
  onRemove: PropTypes.func,
  onSubmit: PropTypes.func,
  renter: PropTypes.object,
  formState: PropTypes.object.isRequired,
};

export default RenterForm;
