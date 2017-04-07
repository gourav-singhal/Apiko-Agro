import React, { PropTypes } from 'react';
import { Container, Form, Button, Input, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../../General/FormWarning';

const UserProfileForm = ({ onSubmit, formState, user }) =>
  <div>
    <Container className="user-profile-form">
      <div className="user-profile-form">
        <Form
          onSubmit={onSubmit}
          loading={formState.loading}
          error={formState.error}
        >
          <Form.Field required label={null}>
            <label><Translate value="first_name" /></label>
            <Input
              name="firstName"
              defaultValue={user.profile.firstName}
            />
            <FormWarning isVisible={formState.warning.name === 'firstName'} />
          </Form.Field>
          <Form.Field required label={null}>
            <label><Translate value="last_name" /></label>
            <Input
              name="lastName"
              defaultValue={user.profile.lastName}
            />
            <FormWarning isVisible={formState.warning.name === 'lastName'} />
          </Form.Field>
          <Button primary type="submit">
            <Translate value="submit" />
          </Button>

          <Message
            error
            header={I18n.t('error')}
            content={formState.error && formState.errorMessage || I18n.t('error_message')}
          />
        </Form>
      </div>
    </Container>
  </div>;

UserProfileForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  formState: PropTypes.object.isRequired,
};

export default UserProfileForm;
