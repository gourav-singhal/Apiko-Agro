const getAuthToken = () => localStorage.getItem('token');
const setAuthToken = token => localStorage.setItem('token', token);
const getTokenHeaderValue = () => `Bearer ${getAuthToken()}`;

const getAuthUser = () => {
  const username = localStorage.getItem('username');
  const roles = localStorage.getItem('roles');
  return username && roles && { username, roles: roles.split(',').map(String) };
};
const setAuthUser = (username, roles) => {
  localStorage.setItem('username', username);
  localStorage.setItem('roles', roles && roles.join(','));
};
// eslint-disable-next-line
const getTokenHeaderObject = () => ({ 'Authorization': getTokenHeaderValue() });

export {
  setAuthToken,
  getAuthToken,
  getAuthUser,
  setAuthUser,
  getTokenHeaderValue,
  getTokenHeaderObject,
};
