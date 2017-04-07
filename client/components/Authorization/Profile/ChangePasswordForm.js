import React, { PropTypes } from 'react';
import { Container, Form, Button, Input, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../../General/FormWarning';

const ChangePasswordForm = ({ onSubmit, formState }) =>
  <div>
    <Container className="change-password-form">
      <div className="change-password-form">
        <Form
          onSubmit={onSubmit}
          loading={formState.loading}
          error={!!formState.error}
        >
          <Form.Field required label={null}>
            <label><Translate value="old_password" /></label>
            <Input type="password" name="oldPassword" />
            <FormWarning
              isVisible={formState.warning.name === 'oldPassword'}
              message={formState.warning.message}
            />
          </Form.Field>

          <Form.Field required label={null}>
            <label><Translate value="new_password" /></label>
            <Input type="password" name="newPassword" />
            <FormWarning
              isVisible={formState.warning.name === 'newPassword'}
              message={formState.warning.message}
            />
          </Form.Field>

          <Form.Field required label={null}>
            <label><Translate value="password_confirm" /></label>
            <Input type="password" name="passwordConfirm" />
            <FormWarning
              isVisible={formState.warning.name === 'passwordConfirm'}
              message={formState.warning.message}
            />
          </Form.Field>

          <Button primary type="submit">
            <Translate value="submit" />
          </Button>

          <Message
            error
            visible={formState.error}
            header={I18n.t('error')}
            content={I18n.t('error_message')}
          />
        </Form>
      </div>
    </Container>
  </div>;

ChangePasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default ChangePasswordForm;
