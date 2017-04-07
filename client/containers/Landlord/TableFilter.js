import { connect } from 'react-redux';
import { withHandlers, compose, lifecycle } from 'recompose';
import { filter as filterActions } from '../General/Actions/actions';

import Filter from '../../components/Landlord/Filter';

const mapStateToProps = state => ({
  filters: state.actions.filter.inModel === 'landlords' && state.actions.filter.filters || [],
});

const enhance = compose(
  connect(mapStateToProps),
  lifecycle({
    componentWillMount() {
      this.props.dispatch(filterActions('landlords', [{ byField: 'status', withValue: 'all' }]));
    },
  }),
  withHandlers({
    isFilterCheck: ({ filters }) => (field, value) =>
      !!filters.find(filter => filter.byField === field && filter.withValue === value),
    handleFilterChange: props => (field, value) => () => {
      const newFilter = [...props.filters];

      const filterFieldId = newFilter.findIndex(filterField =>
        filterField.byField === field
      );
      newFilter[filterFieldId] = { byField: field, withValue: value };
      props.dispatch(filterActions('landlords', newFilter));
    },

    goToPage: ({ setCurrentPage }) => (e, result) => setCurrentPage(result.children),
    goToNextPage: ({ setCurrentPage }) => () => setCurrentPage(n => n + 1),
    goToPreviousPage: ({ setCurrentPage }) => () => setCurrentPage(n => n - 1),
  }),
);

export default enhance(Filter);
