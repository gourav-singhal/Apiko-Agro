import { compose, lifecycle } from 'recompose';
import { get, APIAddresses } from '../../utils/api';
import { showError } from '../Notificator/actions';
import { initOrganization } from '../Organization/actions';
import { initFieldsFilter } from '../MapPanel/actions';
import { setUser } from '../Authorization/Login/actions';
import { initLandlords } from '../Landlord/actions';
import { initAreas } from '../Areas/actions';
import {
  initDepartments,
  initLocalities,
} from '../Departments/actions';
import { initFields } from '../Fields/actions';
import { connect } from 'react-redux';
import MapPage from '../../pages/MapPage/MapPage';

const enhance = compose(
  connect(),
  lifecycle({
    componentWillMount() {
      const { dispatch } = this.props;
      const catchError = err => dispatch(showError('error', err.response.statusText));
      const initModels = (modelName, action, callback) =>
        response => {
          dispatch(action(response.data[modelName]));
          return callback && callback(response.data[modelName]);
        };
      const fieldsFilterInit = localities => {
        const fieldsFilter = {};
        localities.forEach(locality => {
          fieldsFilter[locality._id] = true;
        });
        dispatch(initFieldsFilter(fieldsFilter));
      };
      /**
       * Need to be separated promises,
       * to init rest of data even some request failed
       * **/
      get(APIAddresses.ORGANIZATIONS)
        .then(initModels('organization', initOrganization)).catch(catchError);
      get(APIAddresses.LOCALITIES)
        .then(initModels('localities', initLocalities, fieldsFilterInit)).catch(catchError);
      get(APIAddresses.DEPARTMENTS)
        .then(initModels('departments', initDepartments)).catch(catchError);
      get(APIAddresses.FIELDS)
        .then(initModels('fields', initFields)).catch(catchError);
      get(APIAddresses.LANDLORDS)
        .then(initModels('landlords', initLandlords)).catch(catchError);
      get(APIAddresses.AREAS)
        .then(initModels('areas', initAreas)).catch(catchError);
      get(APIAddresses.ACCOUNT_ME)
        .then(initModels('user', setUser)).catch(catchError);
    },
  })
);

export default enhance(MapPage);
