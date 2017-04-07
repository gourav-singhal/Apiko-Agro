import { OPEN_SIDEBAR, CLOSE_SIDE_BAR, SIDEBAR_OPENED } from './constants.js';

const SIDEBAR = {
  isOpened: false,
  isActive: false,
  activePath: '',
  path: [],
  data: {},
};

export default (state = SIDEBAR, action) => {
  switch (action.type) {
    case OPEN_SIDEBAR:
      return {
        isOpened: false,
        isActive: true,
        activePath: action.activePath,
        path: [...action.path],
        data: action.data || state.data,
      };
    case CLOSE_SIDE_BAR:
      return { ...state, isActive: false };
    case SIDEBAR_OPENED:
      return { ...state, isOpened: true };
    default:
      return state;
  }
};
