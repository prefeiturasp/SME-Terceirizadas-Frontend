import React, { Component } from "react";

import { InputErroMensagem } from "../../Shareable/Input/InputErroMensagem";

import Diagnosticos from "./index";

export default class DiagnosticosField extends Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.addOption = this.addOption.bind(this);
    this.removeOption = this.removeOption.bind(this);
  }

  onSelect(index, newValue) {
    const {
      input: { value, onChange }
    } = this.props;
    onChange(
      value === ""
        ? [newValue]
        : value.map((mapValue, mapIndex) =>
            mapIndex === index ? newValue : mapValue
          )
    );
  }
  addOption() {
    const {
      input: { value, onChange }
    } = this.props;
    onChange(value.concat(""));
  }
  removeOption(index) {
    const {
      input: { value, onChange }
    } = this.props;
    const diagnosticosSelecionados =
      value.length === 1 ? [""] : value.filter((v, i) => i !== index);
    onChange(diagnosticosSelecionados);
  }
  render() {
    const {
      diagnosticos,
      input: { value },
      meta
    } = this.props;
    return (
      <div>
        <Diagnosticos
          diagnosticos={diagnosticos}
          selecionados={value === "" ? [""] : value}
          addOption={this.addOption}
          removeOption={this.removeOption}
          onSelect={this.onSelect}
        />
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
