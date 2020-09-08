import React, { Component } from "react";
import MultiSelect from "./MultiSelect";
import { Field } from "react-final-form";

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
      produtos,
      addOption,
      removeOption,
      input: { name },
      meta,
      deveHabilitarApagar
    } = this.props;
    return (
      <div className="row">
        <div className="col-3">
          <Field
            component={SelectSelecione}
            options={alimentos.map(a => {
              return {
                uuid: a.id.toString(),
                nome: a.nome
              };
            })}
            name={`${name}.alimento`}
          />
        </div>
        <div className="col-2">
          <Field
            component={SelectSelecione}
            options={[
              { uuid: "I", nome: "Isento" },
              { uuid: "S", nome: "Substituir" }
            ]}
            name={`${name}.tipo`}
          />
        </div>
        <div className="col-5">
          <Field
            component={MultiSelect}
            type="select-multi"
            name={`${name}.substitutos`}
            options={produtos.map(a => {
              return {
                value: a.uuid,
                label: a.nome
              };
            })}
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
            onClick={() => deveHabilitarApagar && removeOption()}
            style={BUTTON_STYLE.BLUE_OUTLINE}
          />
        </div>
        <InputErroMensagem meta={meta} />
      </div>
    );
  }
}
