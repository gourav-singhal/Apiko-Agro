import React, { PropTypes } from 'react';
import { GithubPicker } from 'react-color';
import { PICKER_COLORS, DEFAULT_COLOR, DEFAULT_WIDTH, DEFAULT_HEIGHT } from './constants';
import './style.scss';

import Visible from '../Visible';

const ColorPicker = ({
  value,
  isOpen,
  toggleOpen,
  onChangeComplete,
  width,
  height,
  innerValue,
}) => (
  <div>
    <div
      className="color-picker"
      style={{
        backgroundColor: value || innerValue || DEFAULT_COLOR,
        width: width || DEFAULT_WIDTH,
        height: height || width || DEFAULT_HEIGHT,
      }}
      onClick={toggleOpen}
    />
    <Visible isVisible={isOpen}>
      <GithubPicker
        width={163}
        colors={PICKER_COLORS}
        onChangeComplete={onChangeComplete}
      />
    </Visible>
  </div>
);

ColorPicker.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onChangeComplete: PropTypes.func.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  value: PropTypes.string,
  innerValue: PropTypes.string,
};

export default ColorPicker;
