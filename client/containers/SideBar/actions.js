import { OPEN_SIDEBAR, CLOSE_SIDE_BAR, SIDEBAR_OPENED } from './constants.js';

export function openSideBar(activePath, path, data) {
  return {
    type: OPEN_SIDEBAR,
    data,
    activePath,
    path,
  };
}

export function closeSideBar() {
  return {
    type: CLOSE_SIDE_BAR,
  };
}


export function openedSideBar() {
  return {
    type: SIDEBAR_OPENED,
  };
}
