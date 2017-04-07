import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';
import contractsSorting from '../../../components/Contracts/contractsSorting';
import { sort } from '../../General/Actions/actions';

const mapStateToProps = state => ({
  sorting: state.actions.sort.inModel === 'contracts' && state.actions.sort.sortBy,
});

const mapDispatchToProps = dispatch => ({
  handleChangeSorting: newSorting => dispatch(sort('contracts', newSorting)),
});

const enhance = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withHandlers({
    handleSortingChange: props => sortBy => props.handleChangeSorting(sortBy),
  })
);

export default enhance(contractsSorting);
