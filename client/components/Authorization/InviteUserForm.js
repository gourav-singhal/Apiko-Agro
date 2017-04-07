import React, { PropTypes } from 'react';
import { Form, Button, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../General/FormWarning';

const InviteUserForm = ({ onSubmit, formState }) => (
  <div className="invite-form">
    <h2><Translate value="invite_user" /></h2>
    <Form
      className="fluid"
      onSubmit={onSubmit}
      loading={formState.loading}
    >
      <Form.Field>
        <Form.Input
          label="Email"
          name="email"
          placeholder="joe@schmoe.com"
        />
        <FormWarning
          isVisible={formState.warning.name === 'email'}
          message={I18n.t('incorrect_email')}
        />
      </Form.Field>
      <Message
        success
        visible={formState.success}
        content={I18n.t('invite_success_message')}
      />

      <Message
        error
        visible={formState.error}
        header={I18n.t('error')}
        content={I18n.t('error_message')}
      />

      <Button primary type="submit">
        <Translate value="invite" />
      </Button>
    </Form>
  </div>
);

InviteUserForm.propTypes = {
  formState: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default InviteUserForm;
