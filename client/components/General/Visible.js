import { PropTypes } from 'react';

/*
  @params
    isVisible {booolean} - required
    defaultContent {React-element} - can pass this property
      if wanna render something else instead of null
*/

const Visible = ({
  isVisible,
  defaultContent,
  children,
}) => {
  if (isVisible) {
    return children;
  }
  if (defaultContent) {
    return defaultContent;
  }

  return null;
};

Visible.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  defaultContent: PropTypes.element,
  children: PropTypes.element,
};

export default Visible;
