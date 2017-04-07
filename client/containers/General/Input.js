/*
 This container will be used for validation
 different inputs (text, checkbox etc.)
 */

import { compose, withHandlers, withState, lifecycle } from 'recompose';

const enhance = compose(
  withState('inputState', 'changeInput', ({ value }) => ({ value, isValid: true })),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      const nextValue = nextProps.value;
      const { value, required, inputState } = this.props;

      if (nextValue !== value && nextValue !== inputState.value) {
        const isValid = !required || !!nextValue;
        this.props.changeInput({ value: nextValue, isValid });
      }
    },
  }),
  withHandlers({
    handelInput: ({ changeInput, required }) => (e, { value }) => {
      const isValid = !required || !!value;
      changeInput({ value, isValid });
    },
  })
);

export default enhance;
