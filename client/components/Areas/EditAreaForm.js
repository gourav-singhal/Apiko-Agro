import React, { PropTypes } from 'react';
import { Container, Form, Button, Message } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import AreaFormFields from '../../containers/Areas/CreateArea/AreaFormFields';

const EditAreaForm = ({
  formState,
  onSave,
  onExchangeButtonClick,
}) => (
  <div>
    <Container className="change-password-form">
      <div className="change-password-form">
        <Form
          onSubmit={onSave}
          loading={formState.loading}
          error={!!formState.error}
        >

          <AreaFormFields formState={formState} />

          <Button primary type="submit">
            <Translate value="save_changes" />
          </Button>
          <Button primary type="button" onClick={onExchangeButtonClick}>
            <Translate value="exchange-area" />
          </Button>

          <Message
            error
            header={I18n.t('error')}
            content={formState.error || I18n.t('error_message')}
          />
        </Form>
      </div>
    </Container>
  </div>);

EditAreaForm.propTypes = {
  formState: PropTypes.object.isRequired,
  onExchangeButtonClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditAreaForm;
