import React, { PropTypes } from 'react';
import { Container, Form, Button, Input, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../General/FormWarning';
import './style.scss';

const RegistrationForm = ({
  errorMessage,
  onRegister,
  formState,
  onBackButtonClick,
  email,
}) =>
  <div>
    <Container className="registration-form">
      <div className="registration-form">
        <h3><Translate value="registration" /></h3>
        <Form
          onSubmit={onRegister}
          loading={formState.loading}
          success={formState.success}
          error={!!formState.error}
          noValidate
        >
          <Form.Field required label={null}>
            <label><Translate value="email_address" /></label>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={email}
              disabled={!!email}
            />
            <FormWarning
              isVisible={formState.warning.name === 'email'}
              message={formState.warning.message}
            />
          </Form.Field>
          <Form.Field required label={null}>
            <label><Translate value="first_name" /></label>
            <Input name="firstName" placeholder="First name" />
            <FormWarning isVisible={formState.warning.name === 'firstName'} />
          </Form.Field>
          <Form.Field required label={null}>
            <label><Translate value="last_name" /></label>
            <Input name="lastName" placeholder="Last name" />
            <FormWarning isVisible={formState.warning.name === 'lastName'} />
          </Form.Field>
          <Form.Field required label={null}>
            <label><Translate value="password" /></label>
            <Input type="password" name="password" placeholder="Password" />
            <FormWarning
              isVisible={formState.warning.name === 'password'}
              message={formState.warning.message}
            />
          </Form.Field>
          <Form.Field required label={null}>
            <label><Translate value="password_confirm" /></label>
            <Input type="password" name="passwordConfirm" placeholder="Password confirm" />
            <FormWarning
              isVisible={formState.warning.name === 'passwordConfirm'}
              message={formState.warning.message}
            />
          </Form.Field>
          <Button primary type="submit" disabled={!!formState.error}>
            <Translate value="submit" />
          </Button>
          <Button type="button" onClick={onBackButtonClick}>
            <Translate value="back" />
          </Button>

          <Message
            success
            content={I18n.t('invite_success_message')}
          />

          <Message
            error
            header={I18n.t('error')}
            content={errorMessage() || I18n.t('error_message')}
          />
        </Form>
      </div>
    </Container>
  </div>;

RegistrationForm.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onBackButtonClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
};

export default RegistrationForm;
