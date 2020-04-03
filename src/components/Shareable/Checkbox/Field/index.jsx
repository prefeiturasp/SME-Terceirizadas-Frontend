import React, { Component } from "react";
import "./style.scss";

export default class CheckboxField extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.input.onChange(this.props.input.checked ? "" : true);
  }
  render() {
    const {
      name,
      texto,
      children,
      input: { checked }
    } = this.props;
    return (
      <div className="checkbox-field-component">
        <label htmlFor="check" className="checkbox-label">
          <input
            component="input"
            type="checkbox"
            name={name}
            checked={checked}
          />
          <span onClick={this.onClick} className="checkbox-field-span" />{" "}
          {texto || children}
        </label>
      </div>
    );
  }
}
