import React, { PropTypes } from 'react';
import { Table, Menu, Icon } from 'semantic-ui-react';
import { mapProps } from 'recompose';

const enhance = mapProps(props => {
  const { activePage, pagesCount, goToPage } = props;
  const COUNT_AT_TIME = 5;
  const buttons = [];
  let from = 1;
  let to = pagesCount;

  if (pagesCount > COUNT_AT_TIME) {
    if (activePage > 3) {
      buttons.push(<Menu.Item key="back">...</Menu.Item>);
      to = Math.min(activePage + 2, pagesCount);
      from = activePage - (2 + (activePage + 2 - to));
    } else {
      to = from + COUNT_AT_TIME - 1;
    }
  }

  for (let i = from; i <= to; i++) {
    buttons.push(
      <Menu.Item
        key={i}
        active={activePage === i}
        onClick={goToPage}
      >{i}</Menu.Item>);
  }
  if (to < pagesCount) buttons.push(<Menu.Item key="next">...</Menu.Item>);

  return {
    ...props,
    buttons,
    isPreviousBtnDisabled: activePage === 1,
    isNextBtnDisabled: activePage === pagesCount,
  };
});

const Pagination = ({
  colsCount,
  goToPreviousPage,
  goToNextPage,
  buttons,
  isPreviousBtnDisabled,
  isNextBtnDisabled,
}) => (
  <Table.Footer>
    <Table.Row>
      <Table.HeaderCell colSpan={colsCount}>
        <Menu floated="right" size="mini" pagination>
          <Menu.Item
            icon
            className={isPreviousBtnDisabled ? 'disabled' : ''}
            onClick={isPreviousBtnDisabled ? () => {} : goToPreviousPage}
          >
            <Icon name="left chevron" />
          </Menu.Item>

          {buttons}

          <Menu.Item
            icon
            className={isNextBtnDisabled ? 'disabled' : ''}
            onClick={isNextBtnDisabled ? () => {} : goToNextPage}
          >
            <Icon name="right chevron" />
          </Menu.Item>
        </Menu>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Footer>
);

Pagination.propTypes = {
  colsCount: PropTypes.number.isRequired,
  pagesCount: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  goToPreviousPage: PropTypes.func,
  goToNextPage: PropTypes.func,
  goToPage: PropTypes.func,
  buttons: PropTypes.array,
  isPreviousBtnDisabled: PropTypes.bool,
  isNextBtnDisabled: PropTypes.bool,
};

export default enhance(Pagination);
