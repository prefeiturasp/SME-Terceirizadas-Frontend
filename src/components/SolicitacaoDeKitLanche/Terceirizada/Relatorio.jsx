import React, { Component } from "react";
import BaseButton, { ButtonStyle, ButtonType } from "../../Shareable/button";
import { reduxForm } from "redux-form";
import { FluxoDeStatus } from "../../Shareable/FluxoDeStatus";
import { ModalRecusarSolicitacao } from "../../Shareable/ModalRecusarSolicitacao";
import { toastSuccess } from "../../Shareable/dialogs";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      showModal: false,
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
        tempo_passeio: "5 a 7 horas (2 kits)",
        estudantes_total: 75,
        obs:
          "A observação é uma das etapas do método científico. Consiste em perceber," +
          "ver e não interpretar. A observação é relatada como foi visualizada, sem que," +
          " a princípio, as idéias interpretativas dos observadores sejam tomadas."
      },
      listaDeStatus: [
        {
          titulo: "Solicitação Realizada",
          status: "aprovado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        },
        {
          titulo: "Reprovado da DRE",
          status: "reprovado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        },
        {
          titulo: "Cancelado pela CODAE",
          status: "cancelado",
          timestamp: "25/04/2019 às 9:20",
          rf: "7972324",
          nome: "João da Silva"
        },
        {
          titulo: "Visualizado pela Terceirizada",
          status: null,
          timestamp: null
        }
      ]
    };
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.preencherFormulario(this.state.solicitacao);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal(e) {
    this.setState({ showModal: false });
    toastSuccess("Kit Lanche recusado com sucesso!");
  }

  handleSubmit() {
    toastSuccess("Ciência de Kit Lanche enviada com sucesso!");
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
      estudantes_total,
      tempo_passeio,
      obs
    } = this.state.solicitacao;
    const { listaDeStatus, showModal } = this.state;
    return (
      <div>
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
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
                  <FluxoDeStatus listaDeStatus={listaDeStatus} />
                </div>
                <hr />
                <div className="row">
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matriculados total</span>
                    <span>{escola.alunos_total}</span>
                  </div>
                  <div className="report-students-div col-3">
                    <span>Nº de alunos matutino</span>
                    <span>{escola.matutino}</span>
                  </div>
                  <div className="report-students-div col-3">
                    <span>Nº de alunos vespertino</span>
                    <span>{escola.vespertino}</span>
                  </div>
                  <div className="report-students-div col-3">
                    <span>Nº de alunos nortuno</span>
                    <span>{escola.noturno}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">Descrição da Solicitação</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">{data}</p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Motivo</p>
                    <p className="value">{razao}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Local do passeio</p>
                    <p className="value">{local}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Nº de alunos participantes</p>
                    <p className="value">{estudantes_total} alunos</p>
                  </div>
                  <div className="col-8 report-label-value">
                    <p>Tempo previsto do passeio</p>
                    <p className="value">{tempo_passeio}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 float-right report-label-value">
                    <p>Opção desejada</p>
                    {kits.map((kit, key) => {
                      return <p className="value">Modelo de kit nº {kit}</p>;
                    })}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 float-right report-label-value">
                    <p>Nº total de kits</p>
                    <p className="value">
                      {kits.length * estudantes_total} kits
                    </p>
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
                <div className="form-group row float-right mt-4">
                  <BaseButton
                    label={"Recusar Solicitação"}
                    className="ml-3"
                    onClick={() => this.showModal()}
                    type={ButtonType.BUTTON}
                    style={ButtonStyle.OutlinePrimary}
                  />
                  <BaseButton
                    label="Ciente"
                    type={ButtonType.SUBMIT}
                    onClick={() => this.handleSubmit()}
                    style={ButtonStyle.Primary}
                    className="ml-3"
                  />
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
export default RelatorioForm;
