import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import { getCoordsAndSquare } from '../../utils/polygons';
import { setFieldToEdit } from './actions';
import CreateField from '../../components/Fields/CreateField';
import { sideBarOpen } from '../SideBar/siteBarActions';

const enhance = compose(
  connect(({ activeLocality, fieldToEdit, sideBar, map }) => ({
    activeLocality,
    sideBar,
    drawedPolygon: fieldToEdit || {},
    drawingMode: map.drawingMode,
  })),
  withHandlers({
    onPolygonComplete: ({
      activeLocality,
      dispatch,
      sideBar,
    }) => completeEvent => {
      completeEvent.setMap(null);

      const vertics = completeEvent.getPath();
      const field = getCoordsAndSquare(vertics);
      field.localityId = activeLocality;

      dispatch(setFieldToEdit(field));
      sideBarOpen('editField', sideBar, dispatch);
    },

    onUpdatePolygon: ({ dispatch, drawedPolygon }) => googlePolygon => {
      if (googlePolygon) {
        const newCoordsAndSqare = getCoordsAndSquare(googlePolygon);
        dispatch(setFieldToEdit({ ...drawedPolygon, ...newCoordsAndSqare }));
      }
    },
  })
);

export default enhance(CreateField);
