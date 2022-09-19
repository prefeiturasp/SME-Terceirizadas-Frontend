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
          <div className="row title">
            <div className="p-0">
              <span>
                Total de Matriculados
                <div className="rectangle">
                  {meusDados &&
                    pontuarValor(
                      meusDados.vinculo_atual.instituicao
                        .quantidade_alunos_cei_da_cemei +
                        meusDados.vinculo_atual.instituicao
                          .quantidade_alunos_emei_da_cemei
                    )}
                </div>
              </span>
            </div>
            <div className="p-0 ml-3">
              <span>
                Matriculados CEI
                <div className="rectangle">
                  {meusDados &&
                    pontuarValor(
                      meusDados.vinculo_atual.instituicao
                        .quantidade_alunos_cei_da_cemei
                    )}
                </div>
              </span>
            </div>
            <div className="p-0 ml-3">
              <span>Matriculados EMEI</span>
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
