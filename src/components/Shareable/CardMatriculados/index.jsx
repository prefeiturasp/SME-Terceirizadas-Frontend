import React, { Component } from "react";
import { ToggleExpandir } from "../../Shareable/ToggleExpandir";
import "./style.scss";
import { escolaEhCEMEI, pontuarValor } from "../../../helpers/utilities";

export default class CardMatriculados extends Component {
  render() {
    const { collapsed, numeroAlunos, meusDados } = this.props;

    return escolaEhCEMEI() ? (
      <div className="card mt-1">
        <div className="card-body card-enrolled">
          <div className="row">
            <div className="title-rectangle-wrapper">
              <span className="title">Total de Matriculados</span>
              <div className="rectangle">
                {meusDados &&
                  pontuarValor(
                    meusDados.vinculo_atual.instituicao
                      .quantidade_alunos_cei_da_cemei +
                      meusDados.vinculo_atual.instituicao
                        .quantidade_alunos_emei_da_cemei
                  )}
              </div>
            </div>

            <div className="title-rectangle-wrapper">
              <span className="title">Matriculados CEI</span>
              <div className="rectangle">
                {meusDados &&
                  pontuarValor(
                    meusDados.vinculo_atual.instituicao
                      .quantidade_alunos_cei_da_cemei
                  )}
              </div>
            </div>

            <div className="title-rectangle-wrapper">
              <span className="title">Matriculados EMEI</span>
              <div className="rectangle">
                {meusDados &&
                  pontuarValor(
                    meusDados.vinculo_atual.instituicao
                      .quantidade_alunos_emei_da_cemei
                  )}
              </div>
            </div>
            <div className="col-6 beside-text mt-auto ml-2">
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
            <div className="col-5 p-0">Nº de Matriculados</div>
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
            <div className="col-1 px-0">
              <div className="rectangle">
                {numeroAlunos && pontuarValor(numeroAlunos)}
              </div>
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
