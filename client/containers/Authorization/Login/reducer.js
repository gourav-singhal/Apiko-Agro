import { SIGN_IN, SET_USER, SIGN_OUT } from './constants';
import { getAuthToken, getAuthUser } from '../../../utils/api/authorization';

const authorizationDefault = {
  token: getAuthToken() || '',
  user: getAuthUser() || {},
};

const authorization = (state = authorizationDefault, { type, token, user }) => {
  switch (type) {
    case SIGN_IN:
      return { token, user };
    case SIGN_OUT:
      return { token: '', user: {} };
    case SET_USER:
      return { ...state, user };
    default:
      return state;
  }
};

export { authorization };
