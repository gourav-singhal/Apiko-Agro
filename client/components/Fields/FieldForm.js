import React, { PropTypes } from 'react';

import { Button, Form, Confirm } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';

import SearchDropDown from '../../containers/General/SearchDropDown';
import ColorPicker from '../../containers/General/ColorPicker';
import Visible from '../General/Visible';
import FormWarning from '../General/FormWarning';

const FieldForm = ({
  onSubmit,
  onRemoveConfirm,
  field,
  color,
  setColor,
  localities,
  isOpenConfirm,
  setConfirm,
  onChnageLocality,
  formState,
  cancelDrawing,
}) => (
  <Form onSubmit={onSubmit}>
    <Form.Field required label={null}>
      <label><Translate value="field_name" /></label>
      <Form.Input
        defaultValue={field.name && field.name || ''}
        name="name"
      />
      <FormWarning isVisible={formState.warning.name === 'name'} />
    </Form.Field>

    <Form.Field required label={null}>
      <label><Translate value="locality" /></label>
      <SearchDropDown
        collection={localities}
        fieldName="name"
        selection
        defaultValue={field.localityId || ''}
        onChange={onChnageLocality}
        name="localityId"
      />
      <FormWarning isVisible={formState.warning.name === 'localityId'} />
    </Form.Field>

    <div className="field-modal-color-picker">
      <ColorPicker
        defaultValue={color}
        onChange={setColor}
      />
    </div>
    <Button color="brown" type="submit">
      <Translate value="save" />
    </Button>
    <Visible
      isVisible={!!field.name}
      defaultContent={
        <span>
          <Button
            secondary
            type="button"
            onClick={cancelDrawing}
          >
            <Translate value="cancel" />
          </Button>
        </span>
      }
    >
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
          onConfirm={onRemoveConfirm}
          content={I18n.t('confirm_text')}
          cancelButton={I18n.t('no')}
          confirmButton={I18n.t('yes')}
        />
      </span>
    </Visible>
  </Form>
);

FieldForm.propTypes = {
  onSubmit: PropTypes.func,
  onRemoveConfirm: PropTypes.func,
  formState: PropTypes.object,
  field: PropTypes.object,
  color: PropTypes.string,
  setColor: PropTypes.func,
  onChnageLocality: PropTypes.func,
  localities: PropTypes.object,
  isOpenConfirm: PropTypes.bool,
  setConfirm: PropTypes.func,
  cancelDrawing: PropTypes.func,
};

export default FieldForm;
