import React, { Component } from "react";
import MultiSelect from "./MultiSelect";
import { Field } from "react-final-form";
import { OnChange } from "react-final-form-listeners";
import { required } from "helpers/fieldValidators";
import Select from "../../../../../../../Shareable/Select";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../../../Shareable/Botao/constants";

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
  state = { valorSelecionado: undefined };

  render() {
    const {
      alimentos,
      produtos,
      addOption,
      removeOption,
      input: { name },
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
            validate={required}
          />
          <OnChange name={`${name}.alimento`}>
            {value => {
              this.setState({
                valorSelecionado: alimentos.find(al => String(al.id) === value)
              });
            }}
          </OnChange>
        </div>
        <div className="col-2">
          <Field
            component={SelectSelecione}
            options={[
              { uuid: "I", nome: "Isento" },
              { uuid: "S", nome: "Substituir" }
            ]}
            name={`${name}.tipo`}
            validate={required}
          />
        </div>
        <div className="col-5">
          <Field
            component={MultiSelect}
            type="select-multi"
            name={`${name}.substitutos`}
            options={produtos
              .filter(p => {
                if (this.state.valorSelecionado === undefined) {
                  return true;
                }
                const alimento = this.state.valorSelecionado;
                return p.nome.split(" (")[0] !== alimento.nome;
              })
              .map(a => {
                return {
                  value: a.uuid,
                  label: a.nome
                };
              })}
            validate={required}
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
      </div>
    );
  }
}
