import React, { Component } from "react";
import { ToggleExpandir } from "../../Shareable/ToggleExpandir";
import "./style.scss";
import { escolaEhCEMEI, pontuarValor } from "../../../helpers/utilities";

export default class CardMatriculados extends Component {
  render() {
    const { collapsed, numeroAlunos, meusDados } = this.props;
    console.log(meusDados);

    return escolaEhCEMEI() ? (
      <div className="card mt-1">
        <div className="card-body card-enrolled">
          <div className="row title">
            <div className="col-1 p-0">
              <span className="">Total de Matriculados</span>
            </div>
            <div className="col-1 p-0 ml-2">
              <span>Matriculados CEI</span>
            </div>
            <div className="col-1 p-0 ml-2">
              <span>Matriculados EMEI</span>
            </div>
          </div>
          <div className="row">
            <div className="col-1 rectangle mr-2">
              {meusDados &&
                pontuarValor(
                  meusDados.vinculo_atual.instituicao
                    .quantidade_alunos_cei_da_cemei +
                    meusDados.vinculo_atual.instituicao
                      .quantidade_alunos_emei_da_cemei
                )}
            </div>
            <div className="col-1 rectangle mr-2">
              {meusDados &&
                pontuarValor(
                  meusDados.vinculo_atual.instituicao
                    .quantidade_alunos_cei_da_cemei
                )}
            </div>
            <div className="col-1 rectangle mr-2">
              {meusDados &&
                pontuarValor(
                  meusDados.vinculo_atual.instituicao
                    .quantidade_alunos_emei_da_cemei
                )}
            </div>
            <div className="col-5 beside-text mt-auto">
              Informação automática disponibilizada pelo Cadastro da Unidade
              Escolar <br />
            </div>
          </div>
        </div>
      </div>
    ) : numeroAlunos > 0 ? (
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
    ) : (
      <></>
    );
  }
}
