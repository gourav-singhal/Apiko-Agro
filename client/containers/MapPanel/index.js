import { connect } from 'react-redux';
import { compose } from 'recompose';

import MapPanel from '../../components/MapPanel';

const enhance = compose(
  connect(
    state => ({
      organization: state.organization,
    })
  ),
);

export default enhance(MapPanel);
