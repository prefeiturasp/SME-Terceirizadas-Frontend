import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import CardMatriculados from "../../Shareable/CardMatriculados";
import { CardStatusDeSolicitacao } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "../../Shareable/style.scss";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import VisaoGeral from "./VisaoGeral";
import VisaoPorDRE from "./VisaoPorDRE";
import "../../Shareable/style.scss";
import TabelaHistoricoLotesDREs from "../../Shareable/TabelaHistoricoLotesDREs";

class DashboardCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      dre: false
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
  }

  handleField(value) {
    if (value === "dre") {
      this.setState({ dre: true });
    } else {
      this.setState({ dre: false });
    }
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      enrolled,
      handleSubmit,
      solicitations,
      solicitacoesAprovadas,
      vision_by,
      lotes
    } = this.props;
    const { collapsed } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <CardMatriculados
            collapsed={collapsed}
            alterarCollapse={this.alterarCollapse}
            numeroAlunos={enrolled}
          >
            <Collapse isOpened={!collapsed}>
              <TabelaHistoricoLotesDREs lotes={lotes} />
            </Collapse>
          </CardMatriculados>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <span>
                  <i className="fas fa-thumbtack" />
                  Painel de Status de Solicitações
                  <i className="fas fa-pen" />
                </span>
                <span className="float-right">
                  <input className="input-search" placeholder="Pesquisar" />
                  <i className="fas fa-search" />
                </span>
              </div>
              <div>
                <p className="current-date">
                  Data: <span>28 de março de 2019</span>
                </p>
              </div>
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={"card-authorized"}
                    solicitations={solicitacoesAprovadas}
                    icon={"fa-check"}
                    href={"/codae/solicitacoes"}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Pendente Aprovação"}
                    cardType={"card-pending"}
                    solicitations={solicitations}
                    icon={"fa-exclamation-triangle"}
                    href={"/codae/solicitacoes"}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={"card-cancelled"}
                    solicitations={solicitations}
                    icon={"fa-times-circle"}
                    href={"/codae/solicitacoes"}
                  />
                </div>
              </div>
              <p className="caption">Legenda</p>
              <div className="caption-choices">
                <span>
                  <i className="fas fa-check" />
                  Solicitação Autorizada
                </span>
                <span>
                  <i className="fas fa-exclamation-triangle" />
                  Solicitação Pendente Aprovação
                </span>
                <span>
                  <i className="fas fa-ban" />
                  Solicitação Recusada
                </span>
                <span>
                  <i className="fas fa-times-circle" />
                  Solicitação Cancelada
                </span>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold dashboard-card-title">
                <i className="fas fa-lock" />
                Pendências
                <span className="float-right">
                  <Field
                    component={LabelAndCombo}
                    onChange={value => this.handleField(value)}
                    placeholder={"Visão por"}
                    options={vision_by}
                  />
                </span>
              </div>
              <div className="pt-3" />

              {this.state.dre ? (
                <VisaoPorDRE {...this.props} />
              ) : (
                <VisaoGeral />
              )}
            </div>
          </div>
        </form>
      </div>
    );
  }
}
const DashboardCODAEForm = reduxForm({
  form: "dashboardCODAE",
  enableReinitialize: true
})(DashboardCODAE);

export default DashboardCODAEForm;
