import React, { Component } from "react";

import { HOME } from "../../constants/config.constants";
import * as constants from "../../configs/constants";

import Breadcrumb from "../../components/Shareable/Breadcrumb";
import Page from "../../components/Shareable/Page/Page";
import { FluxoDeStatus } from "../../components/Shareable/FluxoDeStatus";

import { getSolicitacaoDietaEspecial } from "../../services/painelNutricionista.service";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: null
    };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    if (uuid) {
      getSolicitacaoDietaEspecial(uuid).then(response => {
        this.setState({
          dietaEspecial: response.results,
          uuid
        });
      });
    }
  }

  render() {
    const { dietaEspecial } = this.state;
    if (!dietaEspecial) return <div>Carregando...</div>;
    const { escola } = dietaEspecial;
    return (
      <div>
        <span className="page-title">{`Inclusão de Alimentação - Solicitação # ${
          dietaEspecial.id_externo
        }`}</span>
        <div className="row">
          <div className="col-2">
            <span className="badge-sme badge-secondary-sme">
              <span className="id-of-solicitation-dre">
                # {dietaEspecial.id_externo}
              </span>
              <br /> <span className="number-of-order-label">ID DO PEDIDO</span>
            </span>
          </div>
          <div className="offset-2 col-8">
            <span className="requester">Escola Solicitante</span>
            <br />
            <span className="dre-name">{escola && escola.nome}</span>
          </div>
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
        </div>
        {/* TODO: Falta telefone e e-mail */}
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
        <div className="row">
          <div className="report-students-div col-3">
            <span>Nº de alunos matriculados total</span>
            <span>{escola.quantidade_alunos}</span>
          </div>
          {/* TODO: Falta quantidade de alunos em cada período */}
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Descrição da Solicitação</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 report-label-value">
            <p>Cód. EOL do Aluno</p>
            <p className="value">{dietaEspecial.codigo_eol_aluno}</p>
          </div>
          <div className="col-6 report-label-value">
            <p>Nome Completo do Aluno</p>
            <p className="value">{dietaEspecial.nome_completo_aluno}</p>
          </div>
          <div className="col-3 report-label-value">
            <p>Data de Nascimento do Aluno</p>
            <p className="value">{dietaEspecial.data_nascimento_aluno}</p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-8 report-label-value">
            <p>
              Nome do Prescritor da receita (médico, nutricionista,
              fonoaudiólogo)
            </p>
            {/* TODO: Incluir nome do prescritor */}
            <p className="value" />
          </div>
          <div className="col-4 report-label-value">
            <p>Registro Funcional (CRM/CRN/CRFa)</p>
            <p className="value">
              {dietaEspecial.registro_funcional_pescritor}
            </p>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-12 report-label-value">
            <p>
              CID-10 (Classificação Internacional de Doenças e Problemas
              Relacionados à Saúde)
            </p>
            {/* TODO: Incluir Denominação CID */}
            <p className="value" />
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Laudo Médico</p>
          </div>
        </div>
        <div className="row">
          <div className="col-10 report-label-value">
            <p>
              O laudo fornecido pelo médico deve ter sido emitido há, no máximo,
              3 meses.
            </p>
          </div>
        </div>
        <hr />
        <div className="row title">
          <div className="col-12">
            <p>Observações</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 report-label-value">
            <p
              className="value"
              dangerouslySetInnerHTML={{
                __html: dietaEspecial.observacoes
              }}
            />
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

export default class RelatorioPage extends Component {
  render() {
    const atual = {
      href: "#",
      titulo: "Relatório"
    };
    const anteriores = [
      {
        href: `/${constants.RELATORIOS}`,
        titulo: "Dietas Especiais"
      }
    ];

    return (
      <Page>
        <Breadcrumb home={HOME} anteriores={anteriores} atual={atual} />
        <Relatorio {...this.props} />
      </Page>
    );
  }
}
