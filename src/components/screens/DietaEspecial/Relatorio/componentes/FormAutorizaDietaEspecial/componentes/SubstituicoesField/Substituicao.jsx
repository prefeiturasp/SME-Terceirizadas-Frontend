import React, { Component } from "react";
import MultiSelect from "./MultiSelect";
import { Field } from "redux-form";
import SelectSelecione from "components/Shareable/SelectSelecione";
import Botao from "components/Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "components/Shareable/Botao/constants";
import InputErroMensagem from "components/Shareable/Input/InputErroMensagem";

import "./style.scss";

export default class SubstituicoesField extends Component {
  render() {
    const {
      alimentos,
      produtos,
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
            options={alimentos.map(a => {
              return {
                uuid: a.id.toString(),
                nome: a.nome
              };
            })}
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
            type="select-multi"
            name={`${name}.substitutos`}
            options={produtos.map(a => {
              return {
                value: a.uuid,
                label: a.nome
              };
            })}
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
