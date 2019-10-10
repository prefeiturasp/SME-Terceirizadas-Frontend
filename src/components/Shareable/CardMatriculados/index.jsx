import React, { Component } from "react";
import { ToggleExpandir } from "../../Shareable/ToggleExpandir";
import "./style.scss";
import { pontuarValor } from "../../../helpers/utilities";

export default class CardMatriculados extends Component {
  render() {
    const { collapsed, numeroAlunos } = this.props;
    return (
      <div className="card">
        <div className="card-body card-enrolled">
          <div className="row title">
            <div className="col-5">Nº de Matriculados</div>
            {collapsed !== undefined && (
              <div className="offset-6 col-1 my-auto text-right">
                <ToggleExpandir
                  onClick={this.props.alterarCollapse}
                  ativo={!collapsed}
                />
              </div>
            )}
          </div>
          <div className="row">
            <div className="rectangle">
              {numeroAlunos && pontuarValor(numeroAlunos)}
            </div>
            <div className="col-6 beside-text mt-auto">
              Informação automática disponibilizada pelo Cadastro da Unidade
              Escolar <br />
            </div>
          </div>
          <div className="row">{this.props.children}</div>
        </div>
      </div>
    );
  }
}
