import React, { Component } from "react";
import { connect } from "react-redux";
import { Stand } from "react-burgers";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm, formValueSelector } from "redux-form";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "../../Shareable/custom.css";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";

class DashboardTerceirizada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      gestaoDeAlimentacao: false
    };
  }

  render() {
    const { enrolled, handleSubmit, solicitations, vision_by } = this.props;
    const { collapsed, gestaoDeAlimentacao } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <div className="card mt-3">
            <div className="card-body">
              <span className="blockquote-sme">
                Nº de Matriculados Terceirizada Ipiranga
              </span>
              <div />
              <span className="badge-sme badge-secondary-sme">{enrolled}</span>
              <span className="blockquote-sme pl-2 text-color-sme-silver">
                Informação automática disponibilizada no Cadastro da Unidade
                Escolar
                <Stand
                  onClick={() => this.setState({ collapsed: !collapsed })}
                  color={"#C8C8C8"}
                  width={18}
                  padding={0}
                  lineHeight={3}
                  lineSpacing={3}
                  className="float-right"
                  active={!collapsed}
                />
              </span>
              <Collapse isOpened={!collapsed}>
                <p className="pt-3 blockquote-sme">
                  Lotes pertencentes à Terceirizada
                </p>
                <div>
                  <table className="table-lote">
                    <tr>
                      <th>Lote</th>
                      <th>Tipo de Gestão</th>
                    </tr>
                    <tr>
                      <td>7A IP I IPIRANGA</td>
                      <td>TERC TOTAL</td>
                    </tr>
                    <tr>
                      <td>7A IP II IPIRANGA</td>
                      <td>TERC TOTAL</td>
                    </tr>
                  </table>
                </div>
              </Collapse>
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
              <div className="row pt-3">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Pendente Aprovação"}
                    cardType={"card-pending"}
                    solicitations={solicitations}
                    icon={"fa-exclamation-triangle"}
                    href={"/Terceirizada/solicitacoes"}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={"card-cancelled"}
                    solicitations={solicitations}
                    icon={"fa-times-circle"}
                    href={"/Terceirizada/solicitacoes"}
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
          {!gestaoDeAlimentacao ? (
            <div
              onClick={() =>
                this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
              }
              className="row"
            >
              <div className="col-4">
                <div className="card mt-3">
                  <div className="card-body">Gestão de Alimentação</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="card mt-3">
                <div className="card-body">
                  <div className="card-title font-weight-bold dashboard-card-title">
                    <i className="fas fa-lock" />
                    Pendências
                    <span className="float-right">
                      <LabelAndCombo
                        onChange={value => this.handleField("reason", value)}
                        placeholder={"Visão por"}
                        options={vision_by}
                      />
                    </span>
                  </div>
                  <div className="pt-3" />
                  <div className="row pt-3">
                    <div className="col-6">
                      <CardPendencia
                        cardTitle={"Escolas"}
                        totalOfOrders={16}
                        priorityOrders={8}
                        onLimitOrders={2}
                        regularOrders={6}
                      />
                    </div>
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
                  <div className="row pt-3">
                    <div className="col-6">
                      <CardPendencia
                        cardTitle={"Inclusão de Refeição"}
                        totalOfOrders={16}
                        priorityOrders={8}
                        onLimitOrders={2}
                        regularOrders={6}
                      />
                    </div>
                    <div className="col-6">
                      <CardPendencia
                        cardTitle={"Alteração de Dias de Cardápio"}
                        totalOfOrders={50}
                        priorityOrders={2}
                        onLimitOrders={18}
                        regularOrders={30}
                      />
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-6">
                      <CardPendencia
                        cardTitle={"Alteração de Cardápio"}
                        totalOfOrders={20}
                        priorityOrders={5}
                        onLimitOrders={10}
                        regularOrders={10}
                      />
                    </div>
                    <div className="col-6">
                      <Link to="/terceirizada/kits-lanche">
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
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    );
  }
}

const DashboardTerceirizadaForm = reduxForm({
  form: "dashboardTerceirizada",
  enableReinitialize: true
})(DashboardTerceirizada);
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

/*const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadFoodInclusion
    },
    dispatch
  );*/

export default connect(
  mapStateToProps
  //mapDispatchToProps
)(DashboardTerceirizadaForm);
