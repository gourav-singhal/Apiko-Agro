import React, { PropTypes } from 'react';
import { Translate } from 'react-i18nify';

import Visible from '../General/Visible';
import FieldForm from '../../containers/Fields/FieldForm';
import InnerPolygonsTable from './InnerPolygonsTable';
import Spinner from '../General/Spinner';

const FieldEdit = ({
  field,
  innerPolygons,
  calculateInnerPolygons,
  isPolygonsLoading,
}) =>
  <div>
    <FieldForm
      calculateInnerPolygons={calculateInnerPolygons}
      innerPolygons={innerPolygons}
      field={field}
    />
    <h3>
      <Translate value="square" />:
      {`  ${field.square}  `}
      <Translate value="hectars" />
    </h3>
    <h3>
      <Translate value="shares" />:
    </h3>
    <div className="inner-polygons-table-container">
      <Visible
        isVisible={!!innerPolygons.length && !isPolygonsLoading}
        defaultContent={
          !isPolygonsLoading ?
            <h3 className="no-polygons">
              (<Translate value="no_polygons" />)
            </h3> : <Spinner />
        }
      >
        <InnerPolygonsTable polygons={innerPolygons} />
      </Visible>
    </div>
  </div>;

FieldEdit.propTypes = {
  field: PropTypes.object,
  innerPolygons: PropTypes.array,
  calculateInnerPolygons: PropTypes.func,
  onCloseModal: PropTypes.func,
  isPolygonsLoading: PropTypes.bool,
};

export default FieldEdit;
