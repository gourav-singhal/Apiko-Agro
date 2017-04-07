import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { authorization } from './containers/Authorization/Login/reducer';
import sideBar from './containers/SideBar/reducer';
import { organization } from './containers/Organization/reducer';
import { appMessage } from './containers/Notificator/reducer';
import { departments, localities, activeLocality } from './containers/Departments/reducer';
import { polygons, activePolygon } from './containers/Polygons/reducer';
import { fields, activeField, fieldToEdit } from './containers/Fields/reducer';
import { fieldsFilter } from './containers/MapPanel/reducer';
import { contracts } from './containers/Contracts/ViewContracts/reducer';
import { renters } from './containers/Renters/reducer';
import { landlords } from './containers/Landlord/reducer';
import { areas } from './containers/Areas/reducer';
import { map, areasFilter } from './containers/Map/reducer';
import actions from './containers/General/Actions/reducer';

const rootReducer = combineReducers({
  renters,
  routing,
  sideBar,
  authorization,
  organization,
  appMessage,
  localities,
  departments,
  activeLocality,
  polygons,
  activePolygon,
  fields,
  activeField,
  fieldToEdit,
  fieldsFilter,
  contracts,
  landlords,
  areas,
  map,
  actions,
  areasFilter,
});

export default rootReducer;
