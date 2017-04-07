import {
  INIT_ORGANIZATION,
  CREATE_ORGANIZATION,
  UPDATE_ORGANIZATION,
} from './constants.js';

const initOrganization = organization => ({
  type: INIT_ORGANIZATION,
  organization,
});

const createOrganization = organization => ({
  type: CREATE_ORGANIZATION,
  organization,
});

const updateOrganization = organization => ({
  type: UPDATE_ORGANIZATION,
  organization,
});

export {
  initOrganization,
  createOrganization,
  updateOrganization,
};
