import React, { PropTypes } from 'react';
import Resizer from 'react-resizer/resizer';
import { Translate } from 'react-i18nify';
import { Sidebar, Header, Divider, Button, Icon, Breadcrumb } from 'semantic-ui-react';

import sideBarContents from './sideBarContents';
import Menu from '../../containers/SideBar/Menu';
import Visible from '../../components/General/Visible';
import Spinner from '../General/Spinner';
import './style.scss';

const SideBar = ({
  sideBar,
  onCloseSideBar,
  onSelectMenuItem,
  handleResize,
  onNavigationItemClick,
}) => {
  const SideBarContent = sideBarContents[sideBar.activePath];
  let resizableElement = null;

  const headerTranslation = {
    createNewArea: 'create_new_area',
    editArea: 'edit_area',
    contracts: 'rent_contracts',
    exchangeArea: 'exchange-area',
  };
  const defaultSidebarWidth = window.innerWidth * 0.4;

  return (
    <div className="app-sidebar-container">
      <div className="menu-container">
        <Menu
          sideBar={sideBar}
          onSelectMenuItem={onSelectMenuItem}
        />
      </div>

      <Sidebar
        animation="overlay"
        direction="right"
        visible={sideBar.isActive}
      >
        <div
          ref={(elem) => { resizableElement = elem; }}
          className="app-sidebar"
          style={{ width: defaultSidebarWidth }}
        >
          <Resizer onResize={(diff) => handleResize(diff, resizableElement)}>
            {sideBar.activePath ?
              <div className="app-sidebar-content">
                <div className="app-sidebar-header">
                  <Button
                    icon
                    className="remove-btn"
                    size="mini"
                    onClick={onCloseSideBar}
                  >
                    <Icon name="remove" />
                  </Button>

                  <Header>
                    <Breadcrumb>
                      {
                        sideBar.path.map((pathName, index) => (
                          <span key={index}>
                            <Breadcrumb.Section
                              onClick={index + 1 !== sideBar.path.length ?
                              onNavigationItemClick(pathName) : null}
                              link={index + 1 !== sideBar.path.length}
                              active={index + 1 === sideBar.path.length}
                            >
                              <Translate
                                value={headerTranslation[pathName] || pathName}
                              />
                            </Breadcrumb.Section>
                            <Visible isVisible={index + 1 !== sideBar.path.length}>
                              <Breadcrumb.Divider icon="right angle" />
                            </Visible>
                          </span>
                          ))
                      }

                    </Breadcrumb>
                  </Header>
                </div>

                <Divider />

                <div className="app-sidebar-body">
                  {sideBar.isOpened && <SideBarContent /> || <Spinner />}
                </div>
              </div>
            : ''}
          </Resizer>
        </div>
      </Sidebar>
    </div>
  );
};

SideBar.propTypes = {
  sideBar: PropTypes.object.isRequired,
  onCloseSideBar: PropTypes.func,
  onSelectMenuItem: PropTypes.func,
  onNavigationItemClick: PropTypes.func,
  handleResize: PropTypes.func,
};

export default SideBar;
