import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import CardHistorico from "../../Shareable/CardHistorico/CardHistorico";
import CardLegendas from "../../Shareable/CardLegendas";
import CardMatriculados from "../../Shareable/CardMatriculados";
import {
  CardStatusDeSolicitacao,
  CARD_TYPE_ENUM
} from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { LabelAndInput } from "../../Shareable/labelAndInput/labelAndInput";
import CardAtalho from "./CardAtalho";
import "./style.scss";
import {
  ESCOLA,
  SOLICITACOES_AUTORIZADAS,
  SOLICITACOES_PENDENTES,
  SOLICITACOES_NEGADAS,
  SOLICITACOES_CANCELADAS
} from "../../../configs/constants";

export class DashboardEscola extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const { collapsed } = this.state;
    const {
      numeroAlunos,
      autorizadas,
      pendentes,
      negadas,
      theadList,
      trs
    } = this.props;
    return (
      <div className="dashboard-school">
        <CardMatriculados
          numeroAlunos={numeroAlunos}
          collapsed={collapsed}
          alterarCollapse={this.alterarCollapse}
        >
          <Collapse isOpened={!collapsed}>
            <div className="user-data">
              <form>
                <div className="row">
                  <div className="form-group col-6">
                    <Field
                      component={LabelAndInput}
                      label="RF Responsável"
                      placeholder="00000000"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                  <div className="form-group col-6">
                    <Field
                      component={LabelAndInput}
                      label="Cargo / Função"
                      placeholder="Nome do Cargo"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <Field
                      component={LabelAndInput}
                      label="Nome"
                      placeholder="Nome Completo"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                      hasIcon
                    />
                  </div>
                </div>
              </form>
            </div>
          </Collapse>
        </CardMatriculados>
        <CardBody
          titulo={"Painel de Status de Solicitações"}
          dataAtual={dataAtual()}
        >
          <div className="row">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Autorizadas"}
                cardType={CARD_TYPE_ENUM.APROVADO}
                solicitations={autorizadas}
                icon={"fa-check"}
                href={`/${ESCOLA}/${SOLICITACOES_AUTORIZADAS}`}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Pendente Aprovação"}
                cardType={"card-pending"}
                solicitations={pendentes}
                icon={"fa-exclamation-triangle"}
                href={`/${ESCOLA}/${SOLICITACOES_PENDENTES}`}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Recusadas"}
                cardType={"card-denied"}
                solicitations={negadas}
                icon={"fa-ban"}
                href={`/${ESCOLA}/${SOLICITACOES_NEGADAS}`}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Canceladas"}
                cardType={"card-cancelled"}
                solicitations={autorizadas}
                icon={"fa-times-circle"}
                href={`/${ESCOLA}/${SOLICITACOES_CANCELADAS}`}
              />
            </div>
          </div>
          <CardLegendas />
        </CardBody>
        <div className="row row-shortcuts">
          <div className="col-3">
            <CardAtalho
              titulo={"Inclusão de Alimentação"}
              texto={
                "Quando houver necessidade de incluir dentro" +
                " da unidade alimentação para os alunos matriculados" +
                " na RME (exemplos: reposição de aula aos sábados; projetos)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/inclusao-de-alimentacao"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Alteração de Cardápio"}
              texto={
                "Quando houver necessidade de alteração do cardápio dentro da unidade, " +
                "alterando o tipo de alimentação (exemplos: alteração de refeição " +
                "por lanche; alteração de refeição e lanche por merenda seca)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/alteracao-de-cardapio"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Solicitação de Kit Lanche"}
              texto={
                "Quando houver necessidade da solicitação de Kit Lanche para consumo durante " +
                "o passeio externo (situações em que não há possibilidade de oferecer a " +
                "alimentação na própria unidade como por exemplo Kit Lanche para visitar " +
                "o museu)"
              }
              textoLink={"Novo pedido"}
              href="/escola/solicitacao-de-kit-lanche"
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Inversão de Dias de Cardapio"}
              texto={
                "Quando houver necessidade da inversão de todo cardápio de um dia do mês por " +
                "outro dia de atendimento (exemplo: inversão do cardápio do dia X pelo dia Y)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/inversao-de-dia-de-cardapio"}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <CardAtalho
              titulo={"Suspensão de Alimentação"}
              texto={
                "Quando houver necessidade de suspensão da alimentação de algum dia do mês " +
                "(refeição/lanche) por não ter atendimento com alunos (exemplo: suspensão da " +
                "alimentação do dia X devido a parada pedagógica)"
              }
              textoLink={"Novo pedido"}
              href={"/escola/suspensao-de-alimentacao"}
            />
          </div>
        </div>
        <CardHistorico
          thead={theadList}
          trs={trs}
          titulo={"Histórico de Alimentações solicitadas"}
        />
      </div>
    );
  }
}

const DashboardEscolaForm = reduxForm({
  form: "dashboardEscola",
  enableReinitialize: true
})(DashboardEscola);

export default DashboardEscolaForm;
