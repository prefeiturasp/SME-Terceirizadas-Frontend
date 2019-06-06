import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, FormSection, reduxForm } from "redux-form";
import "../Shareable/custom.css";
import { getUnifiedSolicitations } from "../../services/unifiedSolicitation.service";
import { toastSuccess, toastError } from "../Shareable/dialogs";

class UnifiedSolicitationFilled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      solicitation: {
        id_of_solicitation: null,
        dre_name: null,
        reason: null,
        date: null,
        local_of_event: null,
        schools: [],
        students_total: null,
        kits_total: null,
        obs: null
      }
    };
  }

  componentDidMount() {
    getUnifiedSolicitations().then(
      res => {
        this.setState({
          ...this.state,
          unifiedSolicitationList: res
        });
      },
      function(error) {
        toastError("Erro ao carregar as inclusões salvas");
      }
    );
    this.setState({
      solicitation: {
        id_of_solicitation: 10000,
        dre_name: "DRE Ipiranga",
        reason: "Programa Contínuo - Mais Educação",
        date: "08/06/2019",
        local_of_event:
          "R. Alexander Bain, 89 - Jardim Nordeste, São Paulo - SP, 03690-060",
        schools: [
          {
            id: "094633",
            name: "EMEF CELSO LEITE RIBEIRO FILHO",
            number_of_students: 20,
            travel_time: "5 a 7 horas (2 kits)",
            options: "Modelo 1, 2, 3",
            number_of_kits: 40
          },
          {
            id: "094633",
            name: "EMEF CELSO LEITE RIBEIRO FILHO",
            number_of_students: 20,
            travel_time: "5 a 7 horas (2 kits)",
            options: "Modelo 1, 2, 3",
            number_of_kits: 40
          }
        ],
        students_total: 300,
        kits_total: 600,
        obs:
          "A observação é uma das etapas do método científico." +
          "Consiste em perceber, ver e não interpretar. A observação " +
          "é relatada como foi visualizada, sem que, a princípio, as" +
          " idéias interpretativas dos observadores sejam tomadas."
      }
    });
  }

  render() {
    const {
      id_of_solicitation,
      dre_name,
      reason,
      date,
      local_of_event,
      schools,
      students_total,
      kits_total,
      obs
    } = this.state.solicitation;
    const { unifiedSolicitationList } = this.state;
    return (
      <div>
        {unifiedSolicitationList.map((unifiedSolicitation, key) => {
          return (
            <div>
              <p>{unifiedSolicitation.dre} - {unifiedSolicitation.lote} - {unifiedSolicitation.formulario.dia}</p>
            </div>
          );
        })}
        {false && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">
              Solicitação Unificada nº {id_of_solicitation}
            </span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation">
                        {id_of_solicitation}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">Nº PEDIDO</span>
                    </span>
                  </div>
                  <div className="my-auto col-8">
                    <span className="requester">Solicitante</span>
                    <br />
                    <span className="dre-name">{dre_name}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7 report-label-value">
                    <p>Motivo</p>
                    <p className="value">{reason}</p>
                  </div>
                  <div className="col-5 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">{date}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{local_of_event}</p>
                  </div>
                </div>
                <table className="report-table">
                  <tr>
                    <th>Código</th>
                    <th>Unidade Escolar</th>
                    <th>Nº de alunos participantes</th>
                    <th>Tempo de passeio</th>
                    <th>Opção desejada</th>
                    <th>Nº Total de Kits</th>
                  </tr>
                  {schools.map((school, key) => {
                    return (
                      <tr>
                        <td>{school.id}</td>
                        <td>{school.name}</td>
                        <td>{school.number_of_students} alunos</td>
                        <td>{school.travel_time}</td>
                        <td>{school.options}</td>
                        <td>{school.number_of_kits} kits</td>
                      </tr>
                    );
                  })}
                </table>
                <div className="row">
                  <div className="col-10 report-label-value">
                    <p>Total de Unidades Escolares Beneficiadas</p>
                    <p className="value">{students_total} unidades escolares</p>
                  </div>
                  <div className="col-2 float-right report-label-value">
                    <p>Total de Kits</p>
                    <p className="value">{kits_total} kits</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p className="value">{obs}</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    );
  }
}

const UnifiedSolicitationFilledForm = reduxForm({
  form: "unifiedSolicitationFilledForm",
  enableReinitialize: true
})(UnifiedSolicitationFilled);

const selector = formValueSelector("unifiedSolicitationFilledForm");
const mapStateToProps = state => {
  return {
    id_of_solicitation: null
  };
};
export default connect(mapStateToProps)(UnifiedSolicitationFilledForm);
