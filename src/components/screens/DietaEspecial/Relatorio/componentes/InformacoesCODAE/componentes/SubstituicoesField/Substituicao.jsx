import React, { Component } from "react";
import MultiSelect from "./MultiSelect";
import { Field } from "redux-form";

import Select from "../../../../../../../Shareable/Select";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../../../Shareable/Botao/constants";
import InputErroMensagem from "../../../../../../../Shareable/Input/InputErroMensagem";

import "./style.scss";

const SelectSelecione = props => {
  const {
    input: { onChange, value },
    options,
    ...rest
  } = props;
  return (
    <Select
      naoDesabilitarPrimeiraOpcao={value !== undefined}
      options={
        value === ""
          ? [{ uuid: "0", nome: "Selecione..." }].concat(options)
          : options
      }
      input={{ value: value || "0", onChange }}
      {...rest}
    />
  );
};

export default class SubstituicoesField extends Component {
  render() {
    const {
      alimentos,
      substitutos,
      addOption,
      removeOption,
      name,
      meta
    } = this.props;
    return (
      <div className="row">
        <div className="col-3">
          <Field
            component={SelectSelecione}
            options={alimentos}
            name={`${name}.alimento`}
            required
          />
        </div>
        <div className="col-2">
          <Field
            component={SelectSelecione}
            options={[
              { uuid: "isento", nome: "Isento" },
              { uuid: "substituir", nome: "Substituir" }
            ]}
            name={`${name}.tipo`}
            required
          />
        </div>
        <div className="col-5">
          <Field
            component={MultiSelect}
            name={`${name}.substitutos`}
            options={substitutos}
            required
          />
        </div>
        <div className="col-2 col-botoes">
          <Botao
            icon={BUTTON_ICON.PLUS}
            onClick={addOption}
            style={BUTTON_STYLE.BLUE_OUTLINE}
          />
          <Botao
            icon={BUTTON_ICON.TRASH}
            onClick={removeOption}
            style={BUTTON_STYLE.BLUE_OUTLINE}
          />
        </div>
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
