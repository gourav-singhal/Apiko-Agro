import { branch, renderComponent } from 'recompose';

import Spinner from '../../components/General/Spinner';
/*
  @params
    hasLoaded {function}

  example:
    loadingSpinner(
      props => !!props.key
    ),
*/

export default hasLoaded =>
  branch(
    props => !hasLoaded(props),
    renderComponent(Spinner)
  );
