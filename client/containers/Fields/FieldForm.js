import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';

import FieldForm from '../../components/Fields/FieldForm';
import normalizeData from '../../utils/data/data_normalizator';
import { DEFAULT_FORM_STATE, getEmptyField } from '../General/form-validation';
import { post, put, remove, APIAddresses } from '../../utils/api';
import { addField, setFieldToEdit, removeField, updateField } from './actions';
import { showError, showSuccess } from '../Notificator/actions';
import { closeSideBar } from '../SideBar/actions';

const isFormValid = (formData, setFormState) => {
  const emptyValueName = getEmptyField(formData);
  if (emptyValueName) {
    setFormState({
      ...DEFAULT_FORM_STATE,
      warning: { name: emptyValueName },
    });
    return false;
  }
  return true;
};

const enhance = compose(
  connect(({ localities }) => ({
    localities: normalizeData('_id', localities),
  })),
  withState('color', 'setColor', ({ field }) => field && field.color || 'grey'),
  withState('isOpenConfirm', 'setConfirm', false),
  withState('formState', 'setFormState', DEFAULT_FORM_STATE),
  withHandlers({
    onSubmit: ({
      color,
      innerPolygons,
      setFormState,
      field,
      dispatch,
    }) => (e, { formData }) => {
      e.preventDefault();
      if (!isFormValid(formData, setFormState)) {
        return;
      }

      const fieldToSave = {
        name: formData.name,
        coordinates: field.coordinates,
        square: field.square,
        localityId: formData.localityId,
        polygonIds: innerPolygons.map(pol => pol._id),
        color,
      };

      // if there is field name then it is updating, because drawed field
      // doesn`t have name
      const isCreating = !field.name;

      const request = isCreating ?
        () => post(APIAddresses.FIELDS, fieldToSave) :
        () => put(`${APIAddresses.FIELDS}/${field._id}`, fieldToSave);

      const successMessage = isCreating ? 'field_created' : 'field_updated';

      request()
        .then(res => {
          if (isCreating) {
            dispatch(addField(res.data));
          } else {
            dispatch(updateField(fieldToSave, field._id));
          }
          dispatch(setFieldToEdit(null));
          dispatch(showSuccess('success', successMessage));
          dispatch(closeSideBar());
        })
        .catch(err => {
          dispatch(showError('error', err.response.statusText));
        });
    },
    onRemoveConfirm: ({ field, dispatch }) => () => {
      remove(`${APIAddresses.FIELDS}/${field._id}`)
        .then(() => {
          dispatch(removeField(field._id));
          dispatch(showSuccess('success', 'field_removed'));
          dispatch(closeSideBar());
          dispatch(setFieldToEdit(null));
        })
        .catch(err => {
          dispatch(showError('error', err.response.statusText));
        });
    },
    cancelDrawing: ({ dispatch }) => () => {
      dispatch(closeSideBar());
      dispatch(setFieldToEdit(null));
    },
    onChnageLocality: ({ dispatch, field }) => (e, { value }) => {
      if (field.localityId !== value) {
        dispatch(setFieldToEdit({ ...field, localityId: value }));
      }
    },
  }),
);

export default enhance(FieldForm);
