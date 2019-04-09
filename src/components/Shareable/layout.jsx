export default props => {
  if (props.isVisible) {
    return props.children;
  } else {
    return false;
  }
};
