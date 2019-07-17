import React, { Component } from "react";
import { Stand } from "react-burgers";
import { Collapse } from "react-collapse";
import { Field, reduxForm } from "redux-form";
import { CardStatusDeSolicitacao } from "../../Shareable/CardStatusDeSolicitacao/CardStatusDeSolicitacao";
import "../Shareable/custom.css";
import { LabelAndCombo } from "../../Shareable/labelAndInput/labelAndInput";
import VisaoGeral from "./VisaoGeral";
import VisaoPorDRE from "./VisaoPorDRE";

class DashboardCODAE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      dre: false
    };
  }

  handleField(value) {
    if (value === "dre") {
      this.setState({ dre: true });
    } else {
      this.setState({ dre: false });
    }
  }

  render() {
    const {
      enrolled,
      handleSubmit,
      solicitations,
      vision_by,
      lotes
    } = this.props;
    const { collapsed } = this.state;
    return (
      <div>
        <form onSubmit={handleSubmit(this.props.handleSubmit)}>
          <Field component={"input"} type="hidden" name="uuid" />
          <div className="card">
            <div className="card-body">
              <span className="blockquote-sme">Nº de Matriculados</span>
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
                <p className="pt-3 blockquote-sme">Lotes</p>
                <div>
                  <table className="table-lote">
                    <tr>
                      <th>Lote</th>
                      <th>DRE</th>
                      <th className="pl-5">Tipo</th>
                    </tr>
                    {lotes.map(function(lote) {
                      return (
                        <tr>
                          <td>{lote.lote}</td>
                          <td>{lote.dre}</td>
                          <td className="pl-5">{lote.tipo}</td>
                        </tr>
                      );
                    })}
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
              <div className="row">
                <div className="col-6">
                  <CardStatusDeSolicitacao
                    cardTitle={"Autorizadas"}
                    cardType={"card-authorized"}
                    solicitations={solicitations}
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

              { this.state.dre ? <VisaoPorDRE { ...this.props }/> : <VisaoGeral /> }
              
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
