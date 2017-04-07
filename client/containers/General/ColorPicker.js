import { withHandlers, withState, compose } from 'recompose';
import _ from 'lodash';
import ColorPicker from '../../components/General/ColorPicker/index';

const enhance = compose(
  withState('isOpen', 'setOpen', false),
  withState('innerValue', 'setInnerValue', ({ defaultValue }) => defaultValue),
  withHandlers({
    onChangeComplete: ({ onChange, setInnerValue, setOpen, value }) => color => {
      onChange(color.hex);
      setOpen(false);
      if (_.isUndefined(value)) {
        setInnerValue(color.hex);
      }
    },
    toggleOpen: ({ isOpen, setOpen }) => () => {
      setOpen(!isOpen);
    },
  })
);

export default enhance(ColorPicker);
