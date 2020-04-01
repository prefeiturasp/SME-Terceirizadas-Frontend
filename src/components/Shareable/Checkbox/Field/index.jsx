import React, { Component } from "react";
import "./style.scss";

export default class CheckboxField extends Component {
  constructor(props) {
    super(props)
    this.onClick = this.onClick.bind(this)
  }
  onClick(event) {
    console.log('event.target.checked', event.target.checked)
    this.props.input.onChange(this.props.input.value === "" ? true : "")
  }
  render() {
    console.log('CheckboxField.props', this.props)
    const { name, texto, children, input: {value} } = this.props;
    return (
      <div className="checkbox-field-component">
        <label htmlFor="check" className="checkbox-label">
          <input component="input" type="checkbox" name={name} checked={value !== ""} />
          <span onClick={this.onClick} className="checkbox-field-span" />{" "}
          {texto || children}
        </label>
      </div>
    );
  };
}
