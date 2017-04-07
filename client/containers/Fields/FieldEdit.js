import { connect } from 'react-redux';
import { compose, withHandlers, withState, lifecycle } from 'recompose';

import FieldEdit from '../../components/Fields/FieldEdit';

import { post, APIAddresses } from '../../utils/api';
import { showError } from '../Notificator/actions';

const enhance = compose(
  connect(({ fieldToEdit }) => ({ field: fieldToEdit || {} })),
  withState('innerPolygons', 'setInnerPolygons', []),
  withState('isPolygonsLoading', 'setPolygonsLoading', false),
  withHandlers({
    calculateInnerPolygons: ({
      setInnerPolygons,
      field,
      setPolygonsLoading,
      dispatch,
    }) => () => {
      setPolygonsLoading(true);
      post(`${APIAddresses.FIELDS}/inner-polygons`, {
        localityId: field.localityId,
        fieldCoords: field.coordinates,
      })
        .then(res => {
          setInnerPolygons(res.data);
          setPolygonsLoading(false);
        })
        .catch(err => {
          dispatch(showError('error', err.response.statusText));
        });
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.calculateInnerPolygons();
    },
    componentWillReceiveProps({ field }) {
      if (
        field.localityId && (
        this.props.field.square !== field.square ||
        this.props.field.localityId !== field.localityId
      )) {
        this.props.calculateInnerPolygons();
      }
    },
  })
);

export default enhance(FieldEdit);
