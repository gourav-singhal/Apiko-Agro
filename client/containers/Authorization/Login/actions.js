
import { SIGN_IN, SET_USER, SIGN_OUT } from './constants.js';

const sigIn = (token, user) => ({
  user,
  token,
  type: SIGN_IN,
});

const signOut = () => ({
  type: SIGN_OUT,
});

const setUser = (user) => ({
  user,
  type: SET_USER,
});

export { sigIn, setUser, signOut };
