import React, { PropTypes } from 'react';
import Autocomplete from 'react-google-autocomplete';
import { Container, Form, Button, Message, TextArea, Confirm } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';
import FormWarning from '../General/FormWarning';

const LandlordForm = ({
  onSubmit,
  onDelete,
  formState,
  statuses,
  landlord,
  isCreateForm,
  confirmModal,
  openConfirm,
  closeConfirm,
}) => (
  <Container>
    <div className="add-landlord-form">
      <h2><Translate value="add_landlord" /></h2>
      <Form
        className="fluid segment"
        onSubmit={onSubmit}
        loading={formState.loading}
        success={formState.success}
        error={!!formState.error}
      >

        <Form.Field>
          <Form.Input
            label={`${I18n.t('FN')} (${I18n.t('full_name')})`}
            name="fullName"
            defaultValue={landlord && landlord.fullName}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'fullName'} />
        </Form.Field>

        <Form.Field>
          <Form.Input
            label={`${I18n.t('PN')} (${I18n.t('personal_number')})`}
            name="personalId"
            defaultValue={landlord && landlord.personalId}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'personalId'} />
        </Form.Field>

        <Form.Field>
          <Form.Input
            label={I18n.t('passport_details')}
            name="passportDetails"
            defaultValue={landlord && landlord.passportDetails}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'passportDetails'} />
          <FormWarning
            isVisible={formState.warning.name === 'passportDetails-range'}
            message={I18n.t('range-error-message', { from: 1, to: 8 })}
          />

        </Form.Field>

        <Form.Field>
          <Form.Input
            label={I18n.t('phone')}
            name="phoneNumber"
            defaultValue={landlord && landlord.phoneNumber}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'phoneNumber'} />
        </Form.Field>

        <Form.Field>
          <Form.Select
            label={I18n.t('status')}
            name="status"
            options={statuses}
            defaultValue={landlord && landlord.status}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'status'} />
        </Form.Field>

        <Form.Field label={null} required>
          <label>{I18n.t('address')}</label>
          <Autocomplete
            name="address"
            types={['(cities)']}
            componentRestrictions={{ country: 'ua' }}
            defaultValue={landlord && landlord.address}
            required
          />
          <FormWarning isVisible={formState.warning.name === 'address'} />
        </Form.Field>

        <Form.Field
          control={TextArea}
          label={I18n.t('comment')}
          name="comment"
          defaultValue={landlord && landlord.comment}
        />

        <Form.Field>
          <label><Translate value="file" /></label>
          <input type="file" name="file" multiple />
        </Form.Field>

        <Message
          success
          content={isCreateForm ?
            I18n.t('add_landlord_success_message')
            : I18n.t('update_landlord_success_message')}
        />

        <Message
          error
          header={I18n.t('error')}
          content={formState.error || I18n.t('error_message')}
        />

        <div className="create-button-container">
          <Button primary type="submit">
            {isCreateForm ? <Translate value="add" /> : <Translate value="update" />}
          </Button>
          {!isCreateForm ?
            <Button secondary onClick={openConfirm}>
              <Translate value="remove" />
            </Button>
            : null}
            {!isCreateForm ?
              <Confirm
                open={confirmModal}
                onCancel={closeConfirm}
                onConfirm={onDelete(landlord._id)}
                content={I18n.t('confirm_text')}
                cancelButton={I18n.t('no')}
                confirmButton={I18n.t('yes')}
              />
              : null}
        </div>
      </Form>
    </div>
  </Container>
);

LandlordForm.propTypes = {
  formState: PropTypes.object.isRequired,
  statuses: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  landlord: PropTypes.object,
  isCreateForm: PropTypes.bool,
  confirmModal: PropTypes.bool,
  openConfirm: PropTypes.func,
  closeConfirm: PropTypes.func,
};

export default LandlordForm;
