import React, { PropTypes } from 'react';
import { Dropdown, Radio, Icon } from 'semantic-ui-react';
import { Translate, I18n } from 'react-i18nify';

const Filter = ({
  isFilterCheck,
  handleFilterChange,
}) => (
  <Dropdown
    icon="filter"
    text={I18n.t('filter')}
    style={{ marginBottom: 15 }}
    className="icon"
    simple labeled floating button
  >
    <Dropdown.Menu>
      <Dropdown.Item>
        <Icon name="dropdown" />
        <span className="text"><Translate value="status" /></span>
        <Dropdown.Menu className="left">
          <Dropdown.Item>
            <Radio
              label={I18n.t('all')}
              name="statusGroup"
              value="all"
              checked={isFilterCheck('status', 'all')}
              onChange={handleFilterChange('status', 'all')}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Radio
              label={I18n.t('the_alive')}
              name="statusGroup"
              value="alive"
              checked={isFilterCheck('status', 'alive')}
              onChange={handleFilterChange('status', 'alive')}
            />
          </Dropdown.Item>
          <Dropdown.Item>
            <Radio
              label={I18n.t('the_dead')}
              name="statusGroup"
              value="dead"
              checked={isFilterCheck('status', 'dead')}
              onChange={handleFilterChange('status', 'dead')}
            />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

Filter.propTypes = {
  isFilterCheck: PropTypes.func.isRequired,
  handleFilterChange: PropTypes.func,
};

export default Filter;
