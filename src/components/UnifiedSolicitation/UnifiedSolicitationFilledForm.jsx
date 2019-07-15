import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { getUnifiedSolicitations } from "../../services/unifiedSolicitation.service";
import { toastError } from "../Shareable/dialogs";

class UnifiedSolicitationFilled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      solicitation: {
        id: null,
        dre: null,
        reason: null,
        date: null,
        local_of_event: null,
        escolas: [],
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
  }

  preencherFormulario(solicitation) {
    this.setState({
      ...this.state,
      solicitation
    });
  }

  render() {
    const { id, lote, formulario, dre, kits_total } = this.state.solicitation;
    const { solicitation, unifiedSolicitationList } = this.state;
    return (
      <div>
        <span className="page-title">Pedidos</span>
        {unifiedSolicitationList.map((unifiedSolicitation, key) => {
          return (
            <div>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => this.preencherFormulario(unifiedSolicitation)}
              >
                {unifiedSolicitation.dre} - {unifiedSolicitation.lote} -{" "}
                {unifiedSolicitation.formulario.dia}
              </p>
            </div>
          );
        })}
        {solicitation.id && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">Solicitação Unificada nº {id}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation">{id}</span>
                      <br />{" "}
                      <span className="number-of-order-label">Nº PEDIDO</span>
                    </span>
                  </div>
                  <div className="my-auto col-8">
                    <span className="requester">Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {dre} - Lote {lote}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-7 report-label-value">
                    <p>Motivo</p>
                    <p className="value">{formulario.razao}</p>
                  </div>
                  <div className="col-5 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">{formulario.dia}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{formulario.local_passeio}</p>
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
                  {formulario.escolas.map((escola, key) => {
                    return (
                      <tr>
                        <td>{escola.id}</td>
                        <td>{escola.nome}</td>
                        <td>
                          {formulario.pedido_multiplo
                            ? escola.numero_alunos
                            : escola.nro_alunos}
                          {" alunos"}
                        </td>
                        <td>
                          {formulario.pedido_multiplo
                            ? formulario.tempo_passeio_formulario
                            : escola.tempo_passeio_formulario}
                        </td>
                        <td>
                          {formulario.pedido_multiplo
                            ? formulario.opcao_desejada
                            : escola.opcao_desejada}
                        </td>
                        <td>
                          {formulario.pedido_multiplo
                            ? formulario.kit_lanche.length *
                              parseInt(escola.numero_alunos)
                            : escola.kit_lanche.length *
                              parseInt(escola.nro_alunos)}
                          {" kits"}
                        </td>
                      </tr>
                    );
                  })}
                </table>
                <div className="row">
                  <div className="col-10 report-label-value">
                    <p>Total de Unidades Escolares Beneficiadas</p>
                    <p className="value">
                      {formulario.escolas.length} unidades escolares
                    </p>
                  </div>
                  <div className="col-2 float-right report-label-value">
                    <p>Total de Kits</p>
                    <p className="value">{kits_total} kits</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{ __html: formulario.obs }}
                    />
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
export default UnifiedSolicitationFilledForm;
