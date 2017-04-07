/*
  If you have state with many props and you need to call
  something like
    changeFirstState();
    changeSecondState();
  just use this state to prevent unnecessary rerender

  Take a look that if you wana use this, you should use names
  'state' and 'changeState'

  Usage example:
    import withSetState from <you path>

    const enhance = compose(
      withState('state', 'cahngeState', {
        prop1: value1,
        prop2: value2,
        prop3: value3,
      }),
      withSetState,
      withHandlers({
        someHandler: ({ setState }) => () => {
          ...
          setState({
            prop1: otherValue1,
            prop2: otherValue2,
          })
        }
      })
    );
*/

import { withHandlers } from 'recompose';

export default withHandlers({
  setState: ({
    state,
    changeState,
  }) => (newState) => {
    changeState({
      ...state,
      ...newState,
    });
  },
});
