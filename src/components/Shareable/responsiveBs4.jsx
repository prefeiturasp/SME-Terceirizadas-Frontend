import React, { Component } from "react";
import PropTypes from "prop-types";

const toCssClasses = numbers => {
  const cols = numbers ? numbers.split(" ") : [];
  let classes = "";

  if (cols[0]) classes += `col-sm-${cols[0]}`;
  if (cols[1]) classes += ` col-lg-${cols[1]}`;
  if (cols[2]) classes += ` col-md-${cols[2]}`;
  if (cols[3]) classes += ` col-xs-${cols[3]}`;

  return classes;
};

export class Grid extends Component {
  static propTypes = {
    cols: PropTypes.string,
    className: PropTypes.string
  };

  static defaultProps = {
    cols: "4 4"
  };

  render() {
    const { cols, className, style } = this.props;
    return (
      <div className={`${toCssClasses(cols)} ${className}`} style={style}>
        {this.props.children}
      </div>
    );
  }
}
