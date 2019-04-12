import React, { Component } from "react";

export function toCssClasses(numbers) {
  const cols = numbers ? numbers.split(" ") : [];
  let classes = "";

  if (cols[0]) classes += `col-xs-${cols[0]}`;
  if (cols[1]) classes += ` col-lg-${cols[1]}`;
  if (cols[2]) classes += ` col-md-${cols[2]}`;
  if (cols[3]) classes += ` col-sm-${cols[3]}`;

  return classes;
}

export class Grid extends Component {
  render() {
    const gridClasses = toCssClasses(this.props.cols || "");
    return (
      <div
        className={`${gridClasses} ${this.props.className}`}
        style={this.props.style}
      >
        {this.props.children}
      </div>
    );
  }
}

export const Input = props => (
  <input
    {...props.input}
    className="form-control"
    placeholder={props.placeholder}
    readOnly={props.readOnly}
    name={props.name}
    value={props.value}
    type={props.type}
  />
);
