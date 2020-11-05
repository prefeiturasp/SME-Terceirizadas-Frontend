import "./style.scss";

import React, { Component } from "react";

import Select from "../../../../../../../Shareable/Select";
import Botao from "../../../../../../../Shareable/Botao";
import {
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../../../../../Shareable/Botao/constants";

export default class Diagnosticos extends Component {
  render() {
    const { selecionados, diagnosticos } = this.props;
    return (
      <div>
        {selecionados.map((opcao, key) => {
          const options =
            opcao === ""
              ? [{ uuid: "", nome: "Selecione" }].concat(diagnosticos)
              : diagnosticos;
          return (
            <div key={key} className="row" id="diagnosticos">
              <div className="col-8">
                <div className="input title">
                  <span className="required-asterisk">*</span>
                  <label className="col-form-label title">
                    Relação por Diagnóstico
                  </label>
                  <Select
                    naoDesabilitarPrimeiraOpcao
                    onChange={event =>
                      this.props.onSelect(key, event.target.value)
                    }
                    options={options}
                    input={{
                      value: opcao,
                      onChange: event =>
                        this.props.onSelect(key, event.target.value)
                    }}
                  />
                </div>
              </div>
              <div className="col-2">
                {opcao === "" || key < selecionados.length - 1 ? (
                  ""
                ) : (
                  <Botao
                    texto="Adicionar"
                    icon={BUTTON_ICON.PLUS}
                    onClick={() => this.props.addOption()}
                    style={BUTTON_STYLE.BLUE_OUTLINE}
                  />
                )}
              </div>
              <div className="col-2">
                {opcao === "" ? (
                  ""
                ) : (
                  <Botao
                    texto="Excluir"
                    icon={BUTTON_ICON.TRASH}
                    onClick={() => this.props.removeOption(key)}
                    style={BUTTON_STYLE.BLUE}
                    className="float-right"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
