import React, { Component } from "react";

import { TIPO_PERFIL } from "../../../constants";

import { FluxoDeStatus } from "../../../components/Shareable/FluxoDeStatus";
import LinhaSolicitacao from "./LinhaSolicitacao";
import Botao from "../../../components/Shareable/Botao";
import {
  BUTTON_TYPE,
  BUTTON_STYLE,
  BUTTON_ICON
} from "../../../components/Shareable/Botao/constants";
import { getRelatorioDietaEspecial } from "../../../services/relatorios";

export default class CabecalhoSolicitacao extends Component {
  render() {
    const { dietaEspecial } = this.props;
    const { escola } = dietaEspecial;
    return (
      <div>
        <span className="page-title">
          {`Dieta Especial - Solicitação # ${dietaEspecial.id_externo}`}
        </span>
        <div className="row">
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre">
                # {dietaEspecial.id_externo}
              </span>
              <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
            </span>
          </div>
          <div className="col-8">
            <div className="beside-text mt-auto">
              Informação automática disponibilizada pelo Cadastro da Unidade
              Escolar <br />
            </div>
            <span className="requester">Escola Solicitante</span>
            <br />
            <span className="dre-name">{escola && escola.nome}</span>
          </div>
          <a
            className="col-2"
            href={getRelatorioDietaEspecial(dietaEspecial.uuid)}
          >
            <Botao
              type={BUTTON_TYPE.BUTTON}
              style={BUTTON_STYLE.BLUE}
              icon={BUTTON_ICON.PRINT}
              className="float-right"
            />
          </a>
        </div>
        <div className="row">
          <div className="col-2 report-label-value">
            <p>DRE</p>
            <p className="value-important">
              {escola &&
                escola.diretoria_regional &&
                escola.diretoria_regional.nome}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>Lote</p>
            <p className="value-important">{escola.lote && escola.lote.nome}</p>
          </div>
          <div className="col-2 report-label-value">
            <p>Tipo de Gestão</p>
            <p className="value-important">
              {escola && escola.tipo_gestao && escola.tipo_gestao.nome}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>Telefone</p>
            <p className="value-important">
              {escola && escola.contato && escola.contato.telefone}
            </p>
          </div>
          <div className="col-2 report-label-value">
            <p>E-mail</p>
            <p className="value-important">
              {escola && escola.contato && escola.contato.email}
            </p>
          </div>
        </div>
        <hr />
        {dietaEspecial.logs && (
          <div className="row">
            <FluxoDeStatus
              listaDeStatus={dietaEspecial.logs}
              tipoDeFluxo="dietaEspecialPartindoEscola"
            />
          </div>
        )}
        <hr />
        <LinhaSolicitacao titulo="Descrição da Solicitação">
          <div className="col-3 report-label-value">
            <p>Cód. EOL do Aluno</p>
            <p className="value">{dietaEspecial.aluno.codigo_eol}</p>
          </div>
          <div className="col-5 report-label-value">
            <p>Nome Completo do Aluno</p>
            <p className="value">{dietaEspecial.aluno.nome}</p>
          </div>
          <div className="col-4 report-label-value">
            <p>Data de Nascimento</p>
            <p className="value">{dietaEspecial.aluno.data_nascimento}</p>
          </div>
        </LinhaSolicitacao>
        <div className="row">
          <div className="col-8 report-label-value">
            <p>
              Nome do Prescritor da receita (médico, nutricionista,
              fonoaudiólogo)
            </p>
            <p className="value">{dietaEspecial.nome_completo_pescritor}</p>
          </div>
          <div className="col-4 report-label-value">
            <p>Registro Funcional</p>
            <p className="value">
              CRM {dietaEspecial.registro_funcional_pescritor}
            </p>
          </div>
        </div>
        {localStorage.getItem("tipo_perfil") === TIPO_PERFIL.TERCEIRIZADA ? (
          ""
        ) : (
          <div>
            <div className="row title">
              <div className="col-8">
                <p>Laudo</p>
              </div>
              <div className="col-4">
                <p>Anexos</p>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <p>
                  Para visualizar o(s) laudo(s) fornecido(s) pelo prescritor,
                  clique nos anexo(s).
                </p>
              </div>
              <div className="col-4">
                {dietaEspecial.anexos
                  .filter(a => a.eh_laudo_medico)
                  .map((a, key) => (
                    <a
                      key={key}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={a.arquivo}
                    >
                      {a.nome.split("/").pop()}
                      {key < dietaEspecial.anexos.length - 1 ? <br /> : ""}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        )}
        <LinhaSolicitacao titulo="Observações">
          <div className="col-12 report-label-value">
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: dietaEspecial.observacoes
              }}
            />
          </div>
        </LinhaSolicitacao>
      </div>
    );
  }
}
