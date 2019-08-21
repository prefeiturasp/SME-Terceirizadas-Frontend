import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Field, formValueSelector, reduxForm } from "redux-form";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import "../../Shareable/style.scss";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";
import "./style.scss";

class DashboardDRE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      lotes: [
        {
          nome: "7A IP I IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        },
        {
          nome: "7A IP II IPIRANGA",
          tipo_de_gestao: "TERC TOTAL"
        }
      ]
    };
    this.alterarCollapse = this.alterarCollapse.bind(this);
  }

  alterarCollapse() {
    this.setState({ collapsed: !this.state.collapsed });
  }

  render() {
    const {
      enrolled,
      handleSubmit,
      solicitations,
      vision_by,
      pendentesAprovacaoList
    } = this.props;
    const { collapsed, lotes } = this.state;

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
              <TabelaHistoricoLotes lotes={lotes} />
            </Collapse>
          </CardMatriculados>
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title font-weight-bold title-color">
                Faça uma Solicitação Unificada
              </div>
              <p>Acesse o formulário para fazer uma Solicitação Unificada</p>
              <Link to="/dre/solicitacao-unificada">
                <BaseButton
                  label="Solicitação Unificada"
                  type={ButtonType.BUTTON}
                  style={ButtonStyle.OutlinePrimary}
                />
              </Link>
            </div>
          </div>
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
                    solicitations={solicitations}
                    icon={"fa-check"}
                    href={"/dre/solicitacoes"}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Pendente Aprovação"}
                    cardType={"card-pending"}
                    solicitations={pendentesAprovacaoList}
                    icon={"fa-exclamation-triangle"}
                    href={"/dre/solicitacoes"}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Recusadas"}
                    cardType={"card-denied"}
                    solicitations={solicitations}
                    icon={"fa-ban"}
                    href={"/dre/solicitacoes"}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={"card-cancelled"}
                    solicitations={solicitations}
                    icon={"fa-times-circle"}
                    href={"/dre/solicitacoes"}
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
                <div className="row">
                  <div className="col-3 mt-3">
                    <i className="fas fa-lock" />
                    Pendências
                  </div>
                  <div className="offset-6 col-3 text-right my-auto">
                    <LabelAndCombo
                      onChange={() => {}}
                      placeholder={"Visão por"}
                      options={vision_by}
                    />
                  </div>
                </div>
              </div>
              <div className="pt-3" />
              <div className="row">
                <div className="col-6">
                  <Link to="/dre/inclusoes-de-alimentacao">
                    <CardPendencia
                      cardTitle={"Inclusão de Alimentação"}
                      totalOfOrders={16}
                      priorityOrders={8}
                      onLimitOrders={2}
                      regularOrders={6}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/dre/inversoes-dia-cardapio">
                    <CardPendencia
                      cardTitle={"Inversão de Dia de Cardápio"}
                      totalOfOrders={50}
                      priorityOrders={2}
                      onLimitOrders={18}
                      regularOrders={30}
                    />
                  </Link>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                 <Link to="/dre/alteracoes-de-cardapio">
                    <CardPendencia
                      cardTitle={"Alteração de Cardápio"}
                      totalOfOrders={20}
                      priorityOrders={5}
                      onLimitOrders={10}
                      regularOrders={10}
                    />
                  </Link>
                </div>
                <div className="col-6">
                  <Link to="/dre/kits-lanche">
                    <CardPendencia
                      cardTitle={"Kit Lanche"}
                      totalOfOrders={120}
                      priorityOrders={20}
                      onLimitOrders={40}
                      regularOrders={60}
                    />
                  </Link>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardPendencia
                    cardTitle={"Pedido Unificado"}
                    totalOfOrders={2}
                    priorityOrders={1}
                    onLimitOrders={0}
                    regularOrders={1}
                  />
                </div>
                <div className="col-6">
                  <CardPendencia
                    cardTitle={"Suspensão de Refeição"}
                    totalOfOrders={47}
                    priorityOrders={10}
                    onLimitOrders={7}
                    regularOrders={30}
                  />
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-6">
                  <CardPendencia
                    cardTitle={"Lotes"}
                    totalOfOrders={47}
                    priorityOrders={10}
                    onLimitOrders={7}
                    regularOrders={30}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const DashboardDREForm = reduxForm({
  form: "dashboardDRE",
  enableReinitialize: true
})(DashboardDRE);
const selector = formValueSelector("foodInclusion");
const mapStateToProps = state => {
  return {
    initialValues: state.foodInclusion.data,
    description_first_period: selector(state, "description_first_period"),
    description_second_period: selector(state, "description_second_period"),
    description_third_period: selector(state, "description_third_period"),
    description_fourth_period: selector(state, "description_fourth_period"),
    description_integrate: selector(state, "description_integrate")
  };
};

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(DashboardDREForm);
