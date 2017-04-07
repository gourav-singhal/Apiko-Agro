import React, { PropTypes } from 'react';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import AreaFormFields from '../../containers/Areas/CreateArea/AreaFormFields';

const CreateAreaForm = ({
  onSubmit,
  formState,
}) =>
  <div>
    <Container className="change-password-form">
      <div className="create-are-form">
        <Form
          onSubmit={onSubmit}
          loading={formState.loading}
          error={!!formState.error}
        >
          <AreaFormFields formState={formState} />

          <Button primary type="submit">
            <Translate value="submit" />
          </Button>

          <Message
            error
            header={I18n.t('error')}
            content={formState.error || I18n.t('error_message')}
          />
        </Form>
      </div>
    </Container>
  </div>;

CreateAreaForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};

export default CreateAreaForm;
