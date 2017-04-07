import React, { PropTypes } from 'react';
import { Button, Form, Container, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../General/FormWarning';
import './style.scss';

const Login = ({ onLogin, onRegisterButtonClick, formState }) =>
  <div>
    <Container className="sign-in-form">
      <div className="sign-in-form">
        <h3><Translate value="authorization" /></h3>
        <Form onSubmit={onLogin} loading={formState.loading} error={!!formState.error}>
          <Form.Field>
            <label><Translate value="email_address" /></label>
            <Form.Input name="email" placeholder={I18n.t('email_address')} />
            <FormWarning isVisible={formState.warning.name === 'email'} />
          </Form.Field>
          <Form.Field>
            <label><Translate value="password" /></label>
            <Form.Input name="password" placeholder={I18n.t('password')} type="password" />
            <FormWarning isVisible={formState.warning.name === 'password'} />
          </Form.Field>

          <Button primary type="submit">
            <Translate value="log_in" />
          </Button>
          <Button onClick={onRegisterButtonClick}>
            <Translate value="register" />
          </Button>

          <Message
            error
            header={I18n.t('error')}
            content={formState.error}
          />
        </Form>
      </div>
    </Container>
  </div>;

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  onRegisterButtonClick: PropTypes.func.isRequired,
};

export { Login };
