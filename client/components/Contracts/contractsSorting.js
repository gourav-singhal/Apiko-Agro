import React, { PropTypes } from 'react';
import { Dropdown, Radio } from 'semantic-ui-react';
import { I18n } from 'react-i18nify';

const contractsSorting = ({
  handleSortingChange,
  sorting,
}) => (
  <div style={{ marginBottom: '10px' }}>
    <Dropdown
      icon="file text outline"
      text={I18n.t('sorting')}
      className="icon"
      simple labeled floating button
    >
      <Dropdown.Menu>
        <Dropdown.Item>
          <Radio
            label={I18n.t('no_sorting')}
            value="noSorting"
            checked={sorting === null}
            onChange={() => handleSortingChange(null)}
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <Radio
            label={I18n.t('expire_soon_contracts')}
            value="expireSoon"
            checked={sorting === 'expire_soon'}
            onChange={() => handleSortingChange('expire_soon')}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

contractsSorting.propTypes = {
  handleSortingChange: PropTypes.func.isRequired,
  sorting: PropTypes.string,
};

export default contractsSorting;
