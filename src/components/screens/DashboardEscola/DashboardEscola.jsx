import React, { Component } from "react";
import { LabelAndInput } from "../../Shareable/labelAndInput/labelAndInput";
import { Field, reduxForm } from "redux-form";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { Collapse } from "react-collapse";
import { dataAtual } from "../../../helpers/utilities";
import CardBody from "../../Shareable/CardBody";
import { CardStatusDeSolicitacao } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import CardAtalho from "./CardAtalho";
import CardLegendas from "./CardLegendas";
import CardHistorico from "../../Shareable/CardHistorico/CardHistorico";
import "./style.scss";

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
    const { numeroAlunos, autorizadas, theadList, trs } = this.props;
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
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group col-6">
                    <Field
                      component={LabelAndInput}
                      label="Cargo / Função"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12">
                    <Field
                      component={LabelAndInput}
                      label="Nome"
                      type="text"
                      name="numero_alunos"
                      className="form-control"
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
                cardType={"card-authorized"}
                solicitations={autorizadas}
                icon={"fa-check"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Pendente Aprovação"}
                cardType={"card-pending"}
                solicitations={autorizadas}
                icon={"fa-exclamation-triangle"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
          </div>
          <div className="row pt-3">
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Recusadas"}
                cardType={"card-denied"}
                solicitations={autorizadas}
                icon={"fa-ban"}
                href={"/escola/status-solicitacoes"}
              />
            </div>
            <div className="col-6">
              <CardStatusDeSolicitacao
                cardTitle={"Canceladas"}
                cardType={"card-cancelled"}
                solicitations={autorizadas}
                icon={"fa-times-circle"}
                href={"/escola/status-solicitacoes"}
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
                "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
              }
              textoLink={"Novo pedido"}
              href={"/escola/inclusao-de-alimentacao"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Alteração de Cardápio"}
              texto={
                "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
              }
              textoLink={"Novo pedido"}
              href={"/escola/alteracao-de-cardapio"}
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Solicitação de Kit Lanche"}
              texto={
                "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
              }
              textoLink={"Novo pedido"}
              href="/escola/solicitacao-de-kit-lanche"
            />
          </div>
          <div className="col-3">
            <CardAtalho
              titulo={"Inversão de Dias de Cardapio"}
              texto={
                "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
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
                "Para solicitar kits para passeios entre na pagina do Kit Lanche e faça um novo pedido"
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
