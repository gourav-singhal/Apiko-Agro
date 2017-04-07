import {
  INIT_DEPARTMENTS,
  PUSH_DEPARTMENT,
  REMOVE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  INIT_LOCALITIES,
  CHANGE_ACTIVE_LOCALITY,
} from './constants';
import normalizeData from '../../utils/data/data_normalizator';

const initDepartments = departments => ({
  type: INIT_DEPARTMENTS,
  departments: normalizeData('_id', departments),
});

const pushDepartment = department => ({
  type: PUSH_DEPARTMENT,
  department,
});

const removeDepartment = departmentId => ({
  type: REMOVE_DEPARTMENT,
  departmentId,
});

const updateDepartment = department => ({
  type: UPDATE_DEPARTMENT,
  department,
});

const initLocalities = localities => ({
  type: INIT_LOCALITIES,
  localities,
});

const changeActiveLocality = localityId => ({
  type: CHANGE_ACTIVE_LOCALITY,
  localityId,
});


export {
  initDepartments,
  pushDepartment,
  removeDepartment,
  updateDepartment,
  initLocalities,
  changeActiveLocality,
};
