import React, { Component } from "react";
import HTTP_STATUS from "http-status-codes";
import BaseButton, { ButtonStyle, ButtonType } from "../../../Shareable/button";
import { Redirect } from "react-router-dom";
import { reduxForm } from "redux-form";
import { FluxoDeStatus } from "../../../Shareable/FluxoDeStatus/FluxoDeStatus";
import { prazoDoPedidoMensagem } from "./helper";
import { stringSeparadaPorVirgulas } from "../../../../helpers/utilities";
import { ModalRecusarSolicitacao } from "../../../Shareable/ModalRecusarSolicitacao";
import { getInclusaoDeAlimentacaoAvulsa } from "../../../../services/inclusaoDeAlimentacaoAvulsa.service";
import {
  getInclusaoDeAlimentacaoContinua,
  DREConfirmaInclusaoDeAlimentacaoContinua
} from "../../../../services/inclusaoDeAlimentacaoContinua.service";
import { getDiasUteis } from "../../../../services/diasUteis.service";
import { dataParaUTC } from "../../../../helpers/utilities";
import { toastSuccess, toastError } from "../../../Shareable/dialogs";
import "../style.scss";
import "./style.scss";

class Relatorio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unifiedSolicitationList: [],
      uuid: null,
      redirect: false,
      showModal: false,
      ehInclusaoContinua: false,
      inclusaoDeAlimentacao: null,
      proximos_dois_dias_uteis: null,
      proximos_cinco_dias_uteis: null,
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

  setRedirect() {
    this.setState({
      redirect: true
    });
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/dre/inclusoes-de-alimentacao" />;
    }
  };

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get("uuid");
    const ehInclusaoContinua = urlParams.get("ehInclusaoContinua");
    const getInclusaoDeAlimentacao = ehInclusaoContinua
      ? getInclusaoDeAlimentacaoContinua
      : getInclusaoDeAlimentacaoAvulsa;
    getDiasUteis().then(response => {
      const proximos_cinco_dias_uteis = dataParaUTC(
        new Date(response.proximos_cinco_dias_uteis)
      );
      const proximos_dois_dias_uteis = dataParaUTC(
        new Date(response.proximos_dois_dias_uteis)
      );
      this.setState({
        proximos_dois_dias_uteis,
        proximos_cinco_dias_uteis
      });
    });
    if (uuid) {
      getInclusaoDeAlimentacao(uuid).then(response => {
        this.setState({
          inclusaoDeAlimentacao: response,
          ehInclusaoContinua,
          uuid
        });
      });
    }
  }

  showModal() {
    this.setState({ showModal: true });
  }

  closeModal(e) {
    this.setState({ showModal: false });
    toastSuccess("Solicitação de Alimentação recusado com sucesso!");
  }

  handleSubmit() {
    const uuid = this.state.uuid;
    DREConfirmaInclusaoDeAlimentacaoContinua(uuid).then(
      response => {
        if (response.status === HTTP_STATUS.OK) {
          toastSuccess("Inclusão de Alimentação aprovada com sucesso!");
          this.setRedirect();
        } else if (response.status === HTTP_STATUS.BAD_REQUEST) {
          toastError("Houve um erro ao aprovar a Inclusão de Alimentação");
        }
      },
      function(error) {
        toastError("Houve um erro ao enviar a Inclusão de Alimentação");
      }
    );
  }

  render() {
    const {
      listaDeStatus,
      showModal,
      inclusaoDeAlimentacao,
      ehInclusaoContinua,
      proximos_cinco_dias_uteis,
      proximos_dois_dias_uteis
    } = this.state;
    return (
      <div>
        <ModalRecusarSolicitacao
          closeModal={this.closeModal}
          showModal={showModal}
        />
        {this.renderRedirect()}
        {!inclusaoDeAlimentacao ? (
          <div>Carregando...</div>
        ) : (
          <form onSubmit={this.props.handleSubmit}>
            <span className="page-title">{`Inclusão de Alimentacão - Pedido # ${
              inclusaoDeAlimentacao.id_externo
            }`}</span>
            <div className="card mt-3">
              <div className="card-body">
                <div className="row">
                  <p className="col-12">
                    {prazoDoPedidoMensagem(
                      inclusaoDeAlimentacao.data_inicial,
                      proximos_dois_dias_uteis,
                      proximos_cinco_dias_uteis
                    )}
                  </p>
                  <div className="col-2">
                    <span className="badge-sme badge-secondary-sme">
                      <span className="id-of-solicitation-dre">
                        {inclusaoDeAlimentacao.id_externo}
                      </span>
                      <br />{" "}
                      <span className="number-of-order-label">
                        ID DO PEDIDO
                      </span>
                    </span>
                  </div>
                  <div className="report-div-beside-order my-auto col-8">
                    <span className="requester">Escola Solicitante</span>
                    <br />
                    <span className="dre-name">
                      {inclusaoDeAlimentacao.escola.nome}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-2 report-label-value">
                    <p>DRE</p>
                    <p className="value-important">
                      {
                        inclusaoDeAlimentacao.escola.lote.diretoria_regional
                          .nome
                      }
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Lote</p>
                    <p className="value-important">
                      {inclusaoDeAlimentacao.escola.lote.nome}
                    </p>
                  </div>
                  <div className="col-2 report-label-value">
                    <p>Tipo de Gestão</p>
                    <p className="value-important">
                      {inclusaoDeAlimentacao.escola.lote.tipo_gestao.nome}
                    </p>
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
                    <span>
                      {inclusaoDeAlimentacao.escola.quantidade_alunos}
                    </span>
                  </div>
                  {/*<div className="report-students-div col-3">
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
                </div>*/}
                </div>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p className="value">
                      Descrição da Inclusão de Alimentação
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-4 report-label-value">
                    <p>Data do evento</p>
                    <p className="value">
                      {ehInclusaoContinua
                        ? `${inclusaoDeAlimentacao.data_inicial} - ${
                            inclusaoDeAlimentacao.data_final
                          }`
                        : `${inclusaoDeAlimentacao.data}`}
                    </p>
                  </div>
                  {inclusaoDeAlimentacao.dias_semana_explicacao !== null && (
                    <div className="col-4 report-label-value">
                      <p>Dias da Semana</p>
                      <p className="value">
                        {inclusaoDeAlimentacao.dias_semana_explicacao}
                      </p>
                    </div>
                  )}
                  <div className="col-4 report-label-value">
                    <p>Motivo</p>
                    <p className="value">{inclusaoDeAlimentacao.motivo.nome}</p>
                  </div>
                </div>
                <table className="table-periods">
                  <tr>
                    <th>Período</th>
                    <th>Tipos de Alimentação</th>
                    <th>Quantidade de Alunos</th>
                  </tr>
                  {inclusaoDeAlimentacao.quantidades_periodo.map(
                    quantidade_por_periodo => {
                      return (
                        <tr>
                          <td>{quantidade_por_periodo.periodo_escolar.nome}</td>
                          <td>
                            {stringSeparadaPorVirgulas(
                              quantidade_por_periodo.tipos_alimentacao,
                              "nome"
                            )}
                          </td>
                          <td>{quantidade_por_periodo.numero_alunos}</td>
                        </tr>
                      );
                    }
                  )}
                </table>
                <div className="row">
                  <div className="col-12 report-label-value">
                    <p>Observações</p>
                    <p
                      className="value"
                      dangerouslySetInnerHTML={{
                        __html: inclusaoDeAlimentacao.descricao
                      }}
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
                    label="Aprovar Solicitação"
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
