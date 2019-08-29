import React, { Component } from "react";
import { Collapse } from "react-collapse";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import CardLogo from "../../Shareable/CardLogo/CardLogo";
import CardMatriculados from "../../Shareable/CardMatriculados";
import CardPendencia from "../../Shareable/CardPendencia/CardPendencia";
import CardStatusDeSolicitacao from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import IconeDietaEspecial from "../../Shareable/Icones/IconeDietaEspecial";
import IconeFinancas from "../../Shareable/Icones/IconeFinancas";
import IconeGestaoDeAlimentacao from "../../Shareable/Icones/IconeGestaoDeAlimentacao";
import IconePD from "../../Shareable/Icones/IconePD";
import IconePlanejamentoCardapio from "../../Shareable/Icones/IconePlanejamentoCardapio";
import IconeSupervisao from "../../Shareable/Icones/IconeSupervisao";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import TabelaHistoricoLotes from "../../Shareable/TabelaHistoricoLotes";

class DashboardTerceirizada extends Component {
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
      ],
      gestaoDeAlimentacao: false
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
      quantidade_suspensoes
    } = this.props;
    const { collapsed, gestaoDeAlimentacao, lotes } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(handleSubmit)}>
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
                    href={"/terceirizada/solicitacoes"}
                  />
                </div>
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Canceladas"}
                    cardType={"card-cancelled"}
                    solicitations={solicitations}
                    icon={"fa-times-circle"}
                    href={"/terceirizada/solicitacoes"}
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
            <div>
              <div className="row mt-3">
                <div
                  className="col-4"
                  onClick={() =>
                    this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
                  }
                >
                  <CardLogo titulo={"Gestão de Alimentação"}>
                    <IconeGestaoDeAlimentacao />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Dieta Especial"} disabled>
                    <IconeDietaEspecial />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Finanças"} disabled>
                    <IconeFinancas />
                  </CardLogo>
                </div>
              </div>
              <div className="row mt-3">
                <div
                  className="col-4"
                  onClick={() =>
                    this.setState({ gestaoDeAlimentacao: !gestaoDeAlimentacao })
                  }
                >
                  <CardLogo titulo={"Pesquisa e Desenvolvimento P&D"} disabled>
                    <IconePD />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Supervisão"} disabled>
                    <IconeSupervisao />
                  </CardLogo>
                </div>
                <div className="col-4">
                  <CardLogo titulo={"Planejamento de Cardápio"} disabled>
                    <IconePlanejamentoCardapio />
                  </CardLogo>
                </div>
              </div>
            </div>
          ) : (
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
                    <Link to="/terceirizada/inclusoes-de-alimentacao">
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
                    <Link to="/terceirizada/inversoes-dia-cardapio">
                      <CardPendencia
                        cardTitle={"Inversão de dias de cardápio"}
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
                    <Link to="/terceirizada/alteracoes-de-cardapio">
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
                    <Link to="/terceirizada/solicitacoes-unificadas">
                      <CardPendencia
                        cardTitle={"Solicitação Unificada"}
                        totalOfOrders={2}
                        priorityOrders={1}
                        onLimitOrders={0}
                        regularOrders={1}
                      />
                    </Link>
                  </div>
                  <div className="col-6">
                    <Link to="/terceirizada/suspensoes-de-alimentacao">
                      <CardPendencia
                        cardTitle={"Suspensão de Alimentação"}
                        totalOfOrders={quantidade_suspensoes}
                        priorityOrders={quantidade_suspensoes}
                        priorityOrdersOnly={true}
                      />
                    </Link>
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

export default DashboardTerceirizadaForm;
