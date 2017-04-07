import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { changeActiveLocality } from './actions';
import { setMapCenterFor } from '../Map/actions';
import LocalityItem from '../../components/Departments/LocalityItem';
import { toggleFieldsFilter } from '../MapPanel/actions';

export const onSelectLocality = ({ dispatch, isMapPanel }) => (locality) => {
  if (isMapPanel && !locality.isActive) {
    dispatch(changeActiveLocality(locality._id));
    dispatch(setMapCenterFor(locality.coordinates, 13));
  }
};

const onPolygonIconClick = ({ dispatch, isActive }) => (e) => {
  if (isActive) {
    e.stopPropagation();
    dispatch(changeActiveLocality(null));
  }
};

const onFieldIconClick = ({ dispatch, isActiveFields }) => (e, localityId) => {
  e.stopPropagation();
  dispatch(toggleFieldsFilter(localityId, !isActiveFields));
};

const mapStateToProps = ({
  activeLocality,
  fieldsFilter,
}, { locality }) => ({
  isActive: !!activeLocality && activeLocality === locality._id,
  isActiveFields: fieldsFilter[locality._id],
});

const enhance = compose(
  connect(mapStateToProps),
  withHandlers({ onSelectLocality, onPolygonIconClick, onFieldIconClick }),
);

export default enhance(LocalityItem);
