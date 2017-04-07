import React, { PropTypes } from 'react';
import { Menu, Popup, Icon } from 'semantic-ui-react';
import { Translate } from 'react-i18nify';
import { SIGN_OUT } from '../../containers/SideBar/constants';
import Visible from '../General/Visible';

const MenuComponent = ({
  sideBar,
  user,
  handleSelectMenuItem,
  hasInvitePermission,
}) => (
  <Menu color="brown" inverted>
    <Popup
      trigger={
        <Menu.Item
          name="organization"
        >
          <Translate value="organization" />
          <Icon name="caret up" />
        </Menu.Item>
      }
      content={
        <Menu vertical>
          <Menu.Item
            name="organization"
            active={sideBar.activePath === 'organization' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="details" />
          </Menu.Item>
          <Visible isVisible={hasInvitePermission()}>
            <Menu.Item
              name="inviteParticipants"
              active={sideBar.value === 'inviteParticipants' && sideBar.isActive}
              onClick={handleSelectMenuItem}
            >
              <Translate value="invite_participants" />
            </Menu.Item>
          </Visible>
        </Menu>
      }
      className="menu-popup"
      on="click"
      basic
    />

    <Popup
      trigger={
        <Menu.Item active={sideBar.subValue === 'guides' && sideBar.isActive}>
          <Translate value="guides" />
          <Icon name="caret up" />
        </Menu.Item>
      }
      content={
        <Menu vertical>
          <Menu.Item
            name="departments"
            active={sideBar.activePath === 'departments' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="departments" />
          </Menu.Item>
          <Menu.Item
            name="contracts"
            active={sideBar.activePath === 'contracts' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="rent_contracts" />
          </Menu.Item>
          <Menu.Item
            name="landlord"
            active={sideBar.activePath === 'landlord' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="landlords" />
          </Menu.Item>
          <Menu.Item
            name="renters"
            active={sideBar.activePath === 'renters' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="renters" />
          </Menu.Item>
          <Menu.Item
            name="areas"
            active={sideBar.activePath === 'areas' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="areas" />
          </Menu.Item>
        </Menu>
      }
      className="menu-popup"
      on="click"
      basic
    />

    <Popup
      trigger={
        <Menu.Item
          name="account"
          position="right"
        >
          {user.profile && `${user.profile.firstName} ${user.profile.lastName}`}
          <Icon name="caret up" />
        </Menu.Item>
      }
      content={
        <Menu vertical>
          <Menu.Item
            name="logout"
            active={sideBar.activePath === 'logout' && sideBar.isActive}
            onClick={handleSelectMenuItem}
            action={SIGN_OUT}
          >
            <Translate value="logout" />
          </Menu.Item>
          <Menu.Item
            name="profile"
            active={sideBar.activePath === 'profile' && sideBar.isActive}
            onClick={handleSelectMenuItem}
          >
            <Translate value="profile" />
          </Menu.Item>
        </Menu>
      }
      className="menu-popup"
      on="click"
      basic
    />
  </Menu>
);

MenuComponent.propTypes = {
  sideBar: PropTypes.object.isRequired,
  handleSelectMenuItem: PropTypes.func,
  hasInvitePermission: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default MenuComponent;
