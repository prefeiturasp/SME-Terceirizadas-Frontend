import React, { Component } from "react";
import { ToggleExpandir } from "../../Shareable/ToggleExpandir";
import "./style.scss";
import { pontuarValor } from "../../../helpers/utilities";

export default class CardMatriculados extends Component {
  render() {
    const { collapsed, numeroAlunos, meusDados } = this.props;
    const eh_cemei =
      meusDados &&
      meusDados.vinculo_atual.instituicao.tipo_unidade_escolar_iniciais ===
        "CEMEI";

    return eh_cemei ? (
      <div className="card mt-1">
        <div className="card-body card-enrolled">
          <div className="row title">
            <div className="col-12">
              <span>Total de Matriculados</span>
              <span className="cei">Matriculados CEI</span>
              <span className="cemei">Matriculados EMEI</span>
            </div>
          </div>
          <div className="row">
            <div className="col-2 rectangle mr-2 ml-2">
              {pontuarValor(
                meusDados.vinculo_atual.instituicao
                  .quantidade_alunos_cei_da_cemei +
                  meusDados.vinculo_atual.instituicao
                    .quantidade_alunos_emei_da_cemei
              )}
            </div>
            <div className="col-2 rectangle mr-2 ml-2">
              {pontuarValor(
                meusDados.vinculo_atual.instituicao
                  .quantidade_alunos_cei_da_cemei
              )}
            </div>
            <div className="col-2 rectangle mr-2 ml-2">
              {pontuarValor(
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
