import React, { Component } from "react";
import { connect } from "react-redux";
import { Field, formValueSelector, FormSection, reduxForm } from "redux-form";
import "../../Shareable/custom.css";
import { StatusFlow } from "../../Shareable/DashboardShared";
import { getUnifiedSolicitations } from "../../../services/unifiedSolicitation.service";
import { toastSuccess, toastError } from "../../Shareable/dialogs";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      solicitacao: {
        id: "12083",
        lote: "7A IP I",
        gestao: "TERC TOTAL",
        dre: "DRE Ipiranga",
        razao: "Programa Contínuo - Mais Educação",
        data: "27/04/2019",
        local: "Aquário de São Paulo",
        escola: {
          nome: "EMEF JOSE CARLOS DE FIGUEIREDO FERRAZ, PREF.",
          alunos_total: "1705",
          matutino: "705",
          vespertino: "700",
          noturno: "300"
        },
        kits: ["1", "3"],
        kits_total: "150",
        obs:
          "A observação é uma das etapas do método científico. Consiste em perceber," +
          "ver e não interpretar. A observação é relatada como foi visualizada, sem que," +
          " a princípio, as idéias interpretativas dos observadores sejam tomadas."
      },
      listaDeStatus: [
        {
          nome: 'Solicitação Realizada',
          status: 'aprovado',
          timestamp: '25/04/2019 às 9:20'
        },
        {
          nome: 'Aprovado da DRE',
          status: 'aprovado',
          timestamp: '25/04/2019 às 9:20'
        },
        {
          nome: 'Aprovado pela CODAE',
          status: null,
          timestamp: null
        },
        {
          nome: 'Visualizado pela Terceirizada',
          status: null,
          timestamp: null
        }
      ]
    };
  }

  componentDidMount() {
    this.preencherFormulario(this.state.solicitacao);
  }

  preencherFormulario(solicitacao) {
    this.setState({
      ...this.state,
      solicitacao
    });
  }

  render() {
    const {
      id,
      lote,
      gestao,
      dre,
      razao,
      data,
      local,
      escola,
      kits,
      kits_total,
      obs
    } = this.state.solicitacao;
    const { listaDeStatus } = this.state;
    return (
      <div>
        {id && (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">Kit Lanche Pedido nº {id}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p className="col-12">
                    Pedidos enviado próximo ao prazo de vencimento (2 dias ou
                    menos)
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        {id} - {lote}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">Nº PEDIDO</span>
                    </span>
                  </div>
                  <div className="my-auto col-8 ml-4">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">{escola.nome}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">{dre}</p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">{lote}</p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">{gestao}</p>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <StatusFlow listaDeStatus={listaDeStatus} />
                </div>
                <hr />
                <div className="row">
                  <div className="col-7 report-label-value">
                    <p>Motivo</p>
                    <p className="value">{razao}</p>
                  </div>
                  <div className="col-5 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">{data}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{local}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-10 report-label-value">
                    <p>Total de Unidades Escolares Beneficiadas</p>
                    <p className="value">{escola.length} unidades escolares</p>
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
                      dangerouslySetInnerHTML={{ __html: obs }}
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

const RelatorioForm = reduxForm({
  form: "unifiedSolicitationFilledForm",
  enableReinitialize: true
})(Relatorio);

const selector = formValueSelector("RelatorioForm");
const mapStateToProps = state => {
  return {
    id: null
  };
};
export default connect(mapStateToProps)(RelatorioForm);
