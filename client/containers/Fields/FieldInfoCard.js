import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import FieldInfoCard from '../../components/Fields/FieldInfoCard';
import { sideBarOpen } from '../SideBar/siteBarActions';
import { setFieldToEdit } from './actions';

const enhance = compose(
  connect(
    state => {
      const field = state.fields.values[state.activeField];
      const fieldLocality = state.localities.find(locality => locality._id === field.localityId);
      return {
        field,
        fieldLocality,
        sideBar: state.sideBar,
      };
    }
  ),
  withHandlers({
    onClickEdit: ({ dispatch, field, sideBar }) => () => {
      dispatch(setFieldToEdit(field));
      sideBarOpen('editField', sideBar, dispatch);
    },
  }),
);

export default enhance(FieldInfoCard);
