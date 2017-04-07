import { SIGN_OUT } from './constants';
import { signOut } from '../Authorization/Login/actions';
import { setAuthToken, setAuthUser } from '../../utils/api/authorization';
import { openSideBar, closeSideBar, openedSideBar } from './actions';
/**
  Provide navigation on Side Bar

  in state has object sideBar with nex structure:
    activePath: <String> current Side Bar item from
                         /client/components/SideBar/sideBarContents.js
    path: <Array> history of Side Bar,
    data: <Object> payload

 **/

const handleMenuAction = (name, dispatch) => {
  switch (name) {
    case SIGN_OUT:
      dispatch(signOut());
      setAuthToken('');
      setAuthUser('', '');
      return true;
    default:
      return false;
  }
};

const ANIMATION_TIME = 300;

/**
 Provide closing of Side Bar
 @params
 dispatch <function> - redux dispatch function
 calback <function>

 **/
const onCloseSideBar = (dispatch, calback) => {
  dispatch(closeSideBar());
  setTimeout(() => calback && calback(), ANIMATION_TIME);
};

const onOpenSideBar = (name, path, sideBar, dispatch, data) => {
  const open = () => {
    dispatch(openSideBar(name, path, data));
    setTimeout(() => {
      dispatch(openedSideBar());
    }, ANIMATION_TIME);
  };

  if (sideBar.isActive) {
    return onCloseSideBar(dispatch, open);
  }
  return open();
};

/**
 Provide opening current item from Side Bar history
 @params
       name: <String> - name of Side Bar item
       sideBar: <Object> - sideBar object from state
       dispatch: <function> - redux dispatch function
       data: <object>
                    formData: <object> - contains form fields data, to fill form
                    selectedItem: <object> - selected item in table

 **/
const sideBarOpenCurrent = (name, sideBar, dispatch, data) => {
  const index = sideBar.path.indexOf(name);
  const newPath = sideBar.path.splice(0, index + 1);
  return onOpenSideBar(name, newPath, sideBar, dispatch, data);
};

/**
 Provide opening first item from Side Bar history
 @params
       name: <String> - name of Side Bar item
       sideBar: <Object> - sideBar object from state
       dispatch: <function> - redux dispatch function
       data: <object>
                   formData: <object> - contains form fields data, to fill form
                   selectedItem: <object> - selected item in table

 **/
const sideBarOpen = (name, sideBar, dispatch, data) =>
   onOpenSideBar(name, [name], sideBar, dispatch, data);


/**
 Provide opening next item from Side Bar history
 @params
       name: <String> - name of Side Bar item
       sideBar: <Object> - sideBar object from state
       dispatch: <function> - redux dispatch function
       data: <object>
                   formData: <object> - contains form fields data, to fill form
                   selectedItem: <object> - selected item in table

 **/

const sideBarOpenNext = (name, sideBar, dispatch, data) => {
  const newPath = [...sideBar.path];
  newPath.push(name);
  return onOpenSideBar(name, newPath, sideBar, dispatch, data);
};


/**
 Provide opening previous item from Side Bar history
 @params
       sideBar: <Object> - sideBar object from state
       dispatch: <function> - redux dispatch function
       data: <object>
                   formData: <object> - contains form fields data, to fill form
                   selectedItem: <object> - selected item in table

 **/
const sideBarOpenPrevious = (sideBar, dispatch, data = {}) => {
  const newPath = [...sideBar.path];
  newPath.pop();
  return onOpenSideBar(newPath[newPath.length - 1], newPath, sideBar, dispatch, data);
};

export {
  handleMenuAction,
  onCloseSideBar,
  sideBarOpenNext,
  sideBarOpen,
  sideBarOpenCurrent,
  sideBarOpenPrevious,
};
