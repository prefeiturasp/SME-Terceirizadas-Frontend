import React, { Component } from "react";
import InputErroMensagem from "../../../Shareable/Input/InputErroMensagem";
import { HelpText } from "../../../Shareable/HelpText";
import "./style.scss";

export default class CheckboxPeriodo extends Component {
  static defaultProps = {
    hasIcon: true,
    input: {
      value: new Date()
    }
  };
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  handleChange(data) {
    this.props.input.onChange(data);
  }
  toggle() {
    this.props.input.onChange(this.props.input.value === "" ? true : "");
  }
  render() {
    const { helpText, label, input, meta, style, nomePeriodo } = this.props;
    const value = input.value !== "" ? true : false;
    return (
      <div className="checkbox-periodo">
        <label htmlFor="check" className="checkbox-label" style={style}>
          <input type="checkbox" name={input.name} checked={value} />
          <span
            className="checkbox-custom"
            data-cy={`checkbox-${nomePeriodo}`}
            onClick={this.toggle}
          />
          <div> {nomePeriodo}</div>
          <HelpText helpText={helpText} />
          <InputErroMensagem meta={meta} />
        </label>
      </div>
    );
  }
}
